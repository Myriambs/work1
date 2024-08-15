const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @route   POST /api/reviews/:userId/:carId
// @desc    Créer un nouvel avis pour une voiture
// @access  Private
router.post('/add/:userId/:carId', async (req, res) => {
    const { userId, carId } = req.params;
    const { rating, comment } = req.body;

    try {
        const newReview = new Review({
            userId,
            carId,
            rating,
            comment
        });

        const review = await newReview.save();
        res.status(201).json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

// @route   GET /api/reviews/:carId
// @desc    Obtenir tous les avis pour une voiture spécifique
// @access  Public
router.get('/getall/:carId', async (req, res) => {
    try {
        const reviews = await Review.find({ carId: req.params.carId });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

// @route   PUT /api/reviews/:reviewId
// @desc    Mettre à jour un avis par ID
// @access  Private
router.put('/update/:reviewId', async (req, res) => {
    const { rating, comment } = req.body;

    try {
        let review = await Review.findByIdAndUpdate(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }

        review.rating = rating !== undefined ? rating : review.rating;
        review.comment = comment || review.comment;

        await review.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

// @route   DELETE /api/reviews/:reviewId
// @desc    Supprimer un avis par ID
// @access  Private
router.delete('/remove/:reviewId', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }

        await review.remove();
        res.json({ msg: 'Review removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', err });
    }
});

module.exports = router;
