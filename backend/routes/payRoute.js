const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Reservation = require('../models/Rental');

// @route   POST /api/payments/add/:userId/:rentalId
// @desc    Créer un nouveau paiement avec le totalPrice de la réservation
// @access  Private
router.post('/add/:userId/:rentalId', async (req, res) => {
    const { userId, rentalId } = req.params;
    const { paymentMethod, paymentStatus } = req.body;

    try {
        // Trouver la réservation pour obtenir le totalPrice
        const reservation = await Reservation.findById(rentalId);

        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        // Créer un nouveau paiement avec le totalPrice de la réservation
        const newPayment = new Payment({
            userId,
            rentalId,
            amount: reservation.totalPrice, // Utiliser totalPrice de la réservation
            paymentMethod,
            paymentStatus
        });

        const payment = await newPayment.save();
        res.status(201).json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});






// @route   GET /api/payments
// @desc    Obtenir tous les paiements
// @access  Private
router.get('/getall', async (req, res) => {
    try {
        const payments = await Payment.find().populate('rentalId userId');
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});
// @route   GET /api/payments/:id
// @desc    Obtenir un paiement par ID
// @access  Private
router.get('/get/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('rentalId userId');
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});
// @route   PUT /api/payments/:id
// @desc    Mettre à jour un paiement
// @access  Private
router.put('/update/:id', async (req, res) => {
    const { status } = req.body;

    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        
        payment.status = status || payment.status;
        payment.updatedAt = Date.now();

        await payment.save();
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});
// @route   DELETE /api/payments/:id
// @desc    Supprimer un paiement
// @access  Private
router.delete('/remove/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        await payment.remove();
        res.json({ msg: 'Payment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

module.exports = router;

