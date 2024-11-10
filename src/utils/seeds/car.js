//Generates two users, one with role "user" and another one with role "admin".
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../api/models/User');
const Car = require('../../api/models/Car');

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        const users = await Car.find();

        if (users.length) {
            await Car.collection.drop();
        }
    })
    .catch((error) => console.log(`Error deleting collection (User): ${error}`))
    .then(async () => {
        const NormalUser1 = await User.findOne({ username: 'NormalUser1' });
        const NormalUser2 = await User.findOne({ username: 'NormalUser2' });
        const AdminUser = await User.findOne({ username: 'AdminUser' });

        data[0].owner = NormalUser1.id;
        data[1].owner = NormalUser2.id;
        data[2].owner = AdminUser.id;

        await Car.insertMany(data);
    })
    .catch((error) => console.log(`Error inserting data (User): ${error}`))
    .finally(() => {
        mongoose.disconnect();
        console.log('car seed executed successfully');
    });

const data = [
    {
        name: 'BMW X5 M',
        brand: 'BMW',
        year: 2000,
        distance: 20000,
    },
    {
        name: 'Mercedes Benz',
        brand: 'Mercedes',
        year: 2012,
        distance: 5000,
    },
    {
        name: 'Kia Rio',
        brand: 'Kia',
        year: 2017,
        distance: 0,
    },
];
