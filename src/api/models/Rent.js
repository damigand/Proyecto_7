const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema(
    {
        carOwner: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        rentedCar: { type: Schema.Types.ObjectId, required: true, ref: 'cars' },
        rentedBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        active: { type: Boolean, required: true, default: false },
        approved: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

const Rent = mongoose.model('rents', rentSchema, 'rents');

module.exports = Rent;
