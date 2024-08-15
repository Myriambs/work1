const express = require('express');
const router = express.Router();
const Car = require('../models/Car');


// @route   POST /api/cars/add/:agencyId
// @desc    Créer un nouveau véhicule pour une agence spécifique
// @access  Private (supposons que l'accès soit limité aux agences connectées)
router.post('/add/:agencyId', async (req, res) => {
    const { 
        type, 
        brand, 
        model, 
        year, 
        registrationNumber, 
        color, 
        transmission, 
        fuelType, 
        mileage, 
        numberOfSeats, 
        dailyRentalPrice, 
        availabilityStatus, 
        imageUrls, 
        description 
    } = req.body;

    try {
        const newCar = new Car({
            ownerId: req.params.agencyId, // Capturer l'ID de l'agence depuis l'URL
            type,
            brand,
            model,
            year,
            registrationNumber,
            color,
            transmission,
            fuelType,
            mileage,
            numberOfSeats,
            dailyRentalPrice,
            availabilityStatus,
            imageUrls,
            description
        });

        const car = await newCar.save();
        res.status(201).json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

module.exports = router;


// @route   GET /car/getall
// @desc    Obtenir tous les véhicules
// @access  Public
router.get('/getall', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

// @route   GET /car/get/:id
// @desc    Obtenir un véhicule par ID
// @access  Public
router.get('/get/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }
        res.json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});


// @route   PUT /car/update/:id
// @desc    Mettre à jour un véhicule par ID
// @access  Public
router.put('/update/:id', async (req, res) => {
    const { 
            brand,
            model,
            year,
            registrationNumber,
            color,
            transmission,
            fuelType,
            mileage,
            numberOfSeats,
            dailyRentalPrice,
            availabilityStatus,
            imageUrls,
            description
    } = req.body;

    try {
        const car = await Car.findByIdAndUpdate(req.params.id);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }
        car.brand = brand || car.brand;
        car.model = model || car.model;
        car.year = year || car.year;
        car.registrationNumber = registrationNumber || car.registrationNumber;
        car.color = color || car.color;
        car.transmission = transmission || car.transmission;
        car.fuelType = fuelType || car.fuelType;
        car.mileage = mileage || car.mileage;
        car.numberOfSeats = numberOfSeats || car.numberOfSeats;
        car.dailyRentalPrice = dailyRentalPrice || car.dailyRentalPrice;
        car.availabilityStatus = availabilityStatus || car.availabilityStatus;
        car.imageUrls = imageUrls || car.imageUrls;
        car.description = description || car.description;

        await car.save();
        res.json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});


// @route   DELETE /car/remove/:id
// @desc    Supprimer un véhicule par ID
// @access  Public

router.delete('/remove/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }

        res.json({ msg: 'Car removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});



module.exports = router;
