const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        year: { type: Number, required: true },
        distance: { type: Number, required: true },
        rented: { type: Boolean, required: true, default: false },
        owner: { type: mongoose.Types.ObjectId },
        approved: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

const Car = mongoose.model('cars', carSchema, 'cars');

module.exports = Car;
