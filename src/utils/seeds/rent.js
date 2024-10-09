//Generates two users, one with role "user" and another one with role "admin".
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../api/models/User');
const Car = require('../../api/models/Car');
const Rent = require('../../api/models/Rent');

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        const users = await Rent.find();

        if (users.length) {
            await Rent.collection.drop();
        }
    })
    .catch((error) => console.log(`Error deleting collection (User): ${error}`))
    .then(async () => {
        const data = [{}, {}];
        const userOne = await User.findOne({ username: 'NormalUser1' });
        const userTwo = await User.findOne({ username: 'NormalUser2' });

        const carOne = await Car.findOne({ owner: userOne.id });
        const carTwo = await Car.findOne({ owner: userTwo.id });

        data[0] = new Rent({
            rentedCar: carOne.id,
            rentedBy: userTwo.id,
            active: true,
            approved: true,
        });
        data[1] = new Rent({
            rentedCar: carTwo.id,
            rentedBy: userOne.id,
            active: false,
            approved: false,
        });

        await Rent.insertMany(data);
    })
    .catch((error) => console.log(`Error inserting data (User): ${error}`))
    .finally(() => mongoose.disconnect());