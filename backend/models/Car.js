const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const carSchema = new mongoose.Schema({
    ownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Agence', 
        required: true 
    },
    type: {
      type: String,
      required: true,
      enum: ['car', 'bus', 'van'],
  },
    brand: { 
        type: String, 
        required: true 
    },
    model: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    registrationNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    color: { 
        type: String, 
        required: true 
    },
    transmission: { 
        type: String, 
        enum: ['Manual', 'Automatic'], 
        required: true 
    },
    fuelType: { 
        type: String, 
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], 
        required: true 
    },
    mileage: { 
        type: Number, 
        required: true 
    },
    numberOfSeats: { 
        type: Number, 
        required: true 
    },
    dailyRentalPrice: { 
        type: Number, 
        required: true 
    },
    availabilityStatus: { 
        type: String, 
        enum: ['Available', 'Booked', 'Unavailable'], 
        default: 'Available' 
    },
    imageUrls: [{ 
        type: String 
    }],
    description: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

carSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});




const Car = mongoose.model('Car', carSchema);

module.exports = Car;

