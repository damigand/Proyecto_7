const Rent = require("../models/Rent");
const User = require("../models/User");
const Car = require("../models/Car");

const getAllRents = async (req, res, next) => {
    try {
        return res.status(200).json("getAllRents");
    } catch (error) {
        return res.status(500).json(`Error (getAllRents): ${error}`);
    }
};

const getRentById = async (req, res, next) => {
    try {
        return res.status(200).json("getRentById");
    } catch (error) {
        return res.status(500).json(`Error (getRentById): ${error}`);
    }
};

const getRentByCarId = async (req, res, next) => {
    try {
        return res.status(200).json("getRentByCarId");
    } catch (error) {
        return res.status(500).json(`Error (getRentByCarId): ${error}`);
    }
};

const getRentByRenterId = async (req, res, next) => {
    try {
        return res.status(200).json("getRentByRenterId");
    } catch (error) {
        return res.status(500).json(`Error (getRentByRenterId): ${error}`);
    }
};

const getRentByActive = async (req, res, next) => {
    try {
        return res.status(200).json("getRentByActive");
    } catch (error) {
        return res.status(500).json(`Error (getRentByActive): ${error}`);
    }
};

const getRentByApproved = async (req, res, next) => {
    try {
        return res.status(200).json("getRentByApproved");
    } catch (error) {
        return res.status(500).json(`Error (getRentByApproved): ${error}`);
    }
};

const createRent = async (req, res, next) => {
    try {
        return res.status(200).json("createRent");
    } catch (error) {
        return res.status(500).json(`Error (createRent): ${error}`);
    }
};

const editRent = async (req, res, next) => {
    try {
        return res.status(200).json("editRent");
    } catch (error) {
        return res.status(500).json(`Error (editRent): ${error}`);
    }
};

const deleteRent = async (req, res, next) => {
    try {
        return res.status(200).json("deleteRent");
    } catch (error) {
        return res.status(500).json(`Error (deleteRent): ${error}`);
    }
};

module.exports = {
    getAllRents,
    getRentById,
    getRentByCarId,
    getRentByRenterId,
    getRentByApproved,
    getRentByActive,
    createRent,
    editRent,
    deleteRent,
};
