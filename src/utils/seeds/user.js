//Generates two users, one with role "user" and another one with role "admin".
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../api/models/User");
const bcrypt = require("bcrypt");

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        const users = await User.find();

        if (users.length) {
            await User.collection.drop();
        }
    })
    .catch((error) => console.log(`Error deleting collection (User): ${error}`))
    .then(async () => {
        await User.insertMany(data);
    })
    .catch((error) => console.log(`Error inserting data (User): ${error}`))
    .finally(() => mongoose.disconnect());

const data = [
    {
        username: "NormalUser1",
        password: bcrypt.hashSync("NormalUser1", 10),
    },
    {
        username: "NormalUser2",
        password: bcrypt.hashSync("NormalUser2", 10),
    },
    {
        username: "AdminUser",
        password: bcrypt.hashSync("admin", 10),
        role: "admin",
    },
];
