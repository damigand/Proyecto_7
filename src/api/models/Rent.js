const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentSchema = new Schema(
    {
        rentedCar: { type: mongoose.Types.ObjectId, required: true },
        rentedBy: { type: mongoose.Types.ObjectId, required: true },
        active: { type: Boolean, required: true, default: true },
        approved: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

const Rent = mongoose.model("rents", rentSchema, "rents");

module.exports = Rent;
