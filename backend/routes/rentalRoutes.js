const express = require('express');
const router = express.Router();
const Reservation = require('../models/Rental');

// @route   POST /api/reservations/:userId/:carId
// @desc    Créer une nouvelle réservation avec userId et carId dans l'URL
// @access  Private
router.post('/add/:userId/:carId', async (req, res) => {
    const { userId, carId } = req.params;
    const { startDate, endDate } = req.body;

    try {
        const totalPrice = await Reservation.calculateTotalPrice(carId, startDate, endDate);

        const newReservation = new Reservation({
            clientId: userId,
            carId: carId,
            startDate,
            endDate,
            totalPrice,
        });

        const reservation = await newReservation.save();
        res.status(201).json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

module.exports = router;



// @route   GET /api/reservations
// @desc    Obtenir toutes les réservations
// @access  Private
router.get('/getall', async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('clientId', 'name email')
            .populate('carId', 'brand model');
        res.json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

// @route   GET /api/reservations/:id
// @desc    Obtenir une réservation par ID
// @access  Private
router.get('/get/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('clientId', 'name email')
            .populate('carId', 'brand model');
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

// @route   PUT /api/reservations/:id
// @desc    Mettre à jour une réservation par ID
// @access  Private
router.put('/update/:id', async (req, res) => {
    const { startDate, endDate, totalPrice } = req.body;

    try {
        let reservation = await Reservation.findByIdAndUpdate(req.params.id);
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        reservation.startDate = startDate || reservation.startDate;
        reservation.endDate = endDate || reservation.endDate;
        reservation.totalPrice = totalPrice || reservation.totalPrice;

        await reservation.save();
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

// @route   DELETE /api/reservations/:id
// @desc    Supprimer une réservation par ID
// @access  Private
router.delete('/remove/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        await reservation.remove();
        res.json({ msg: 'Reservation removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

module.exports = router;
