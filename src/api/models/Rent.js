const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema(
    {
        carOwner: { type: mongoose.Types.ObjectId, required: true },
        rentedCar: { type: mongoose.Types.ObjectId, required: true },
        rentedBy: { type: mongoose.Types.ObjectId, required: true },
        active: { type: Boolean, required: true, default: false },
        approved: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

const Rent = mongoose.model('rents', rentSchema, 'rents');

module.exports = Rent;
