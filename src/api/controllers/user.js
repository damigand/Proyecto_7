const User = require('../models/User');
const Car = require('../models/Car');
const Rent = require('../models/Rent');
const bcrypt = require('bcrypt');
const jwt = require('../../utils/token/token');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(`Error (getAllUsers): ${error}`);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(`Error (getUserById): ${error}`);
    }
};

const getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.find({ username: { $regex: username, $options: 'i' } });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(`Error (getUserByUsername): ${error}`);
    }
};

const createUser = async (req, res, next) => {
    try {
        if (!req.body.username) return res.status(500).json('Username required.');

        if (!req.body.password) return res.status(500).json('Password required.');

        const username = req.body.username;
        const taken = await User.findOne({ username: username });

        if (taken) {
            return res.status(400).json('Username already taken');
        }

        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
        });

        const user = await newUser.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(`Error (createUser): ${error}`);
    }
};

const editUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userToEdit = await User.findById(id);

        if (req.user.id != userToEdit.id && req.user.role != 'admin') {
            return res.status(401).json("You can't edit this user.");
        }

        const change = {
            username: req.body.username || userToEdit.username,
        };

        if (req.user.role == 'admin') {
            change.role = req.body.role || userToEdit.role;
        }

        const newUser = await User.findOneAndUpdate({ _id: id }, change, { new: true });
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json(`Error (editUser): ${error}`);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userToRemove = await User.findById(id);

        if (req.user.id == userToRemove.id || req.user.role == 'admin') {
            //Si un usuario es borrado, se borran tanto sus coches como sus alquileres.
            const cars = await Car.find({ owner: id });
            if (cars.length > 1) await Car.deleteMany(cars);
            else await Car.deleteOne(cars[0]);

            const rents = await Rent.find({ carOwner: id });
            if (rents.length > 1) await Rent.deleteMany(rents);
            else await Rent.deleteOne(rents[0]);

            await User.findByIdAndDelete(userToRemove.id);

            return res.status(200).json('User successfully deleted');
        } else {
            return res.status(401).json("You can't delete this user");
        }
    } catch (error) {
        return res.status(500).json(`Error (deleteUser): ${error}`);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json('That username does not exist');
        }

        const check = bcrypt.compareSync(password, user.password);

        if (!check) {
            return res.status(400).json('Incorrect password');
        }

        const token = jwt.generateToken(user._id, user.username);
        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json(`Error (loginUser): ${error}`);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    editUser,
    deleteUser,
    loginUser,
};
