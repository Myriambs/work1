const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Car = require('./Car'); // Assurez-vous d'importer le modèle Car

const reservationSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

// Méthode pour calculer le prix total
reservationSchema.statics.calculateTotalPrice = async function (carId, startDate, endDate) {
  try {
    const car = await Car.findById(carId);
    if (!car) {
      throw new Error('Car not found');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Durée en jours

    const totalPrice = durationInDays * car.dailyRentalPrice;
    return totalPrice;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model('Reservation', reservationSchema);
