const User = require("../models/User");
const bcrypt = require("bcrypt");

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
        const user = await User.find({ username: username });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(`Error (getUserByUsername): ${error}`);
    }
};

const createUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const taken = await User.findOne({ username: username });

        if (taken) {
            return res.status(400).json("username already taken");
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
        const oldUser = await User.findById(id);
        oldUser.username = req.body.username;
        oldUser.password = req.body.password;

        const user = oldUser.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(`Error (editUser): ${error}`);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);

        return res.status(200).json("User successfully deleted");
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
            return res.status(404).json("There is no user with that username");
        }

        const check = bcrypt.compareSync(password, user.password);

        if (!check) {
            return res.status(400).json("Incorrect password");
        }

        //Generar token y devolver.
        return res.status(200).json(user);
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
