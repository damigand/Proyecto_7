const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user',
        },
        userRents: [{ type: mongoose.Types.ObjectId, ref: 'rents' }],
        userCars: [{ type: mongoose.Types.ObjectId, ref: 'cars' }],
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;
