const Car = require('../models/Car');

const getAllCars = (req, res, next) => {
    try {
        return res.status(200).json('getAllCars');
    } catch (error) {
        return res.status(500).json(`Error (getAllCars): ${error}`);
    }
};

const getCarById = (req, res, next) => {
    try {
        return res.status(200).json('getCarById');
    } catch (error) {
        return res.status(500).json(`Error (getCarById): ${error}`);
    }
};

const getCarsByName = (req, res, next) => {
    try {
        return res.status(200).json('getCarsByName');
    } catch (error) {
        return res.status(500).json(`Error (getCarsByName): ${error}`);
    }
};

const getCarsByBrand = (req, res, next) => {
    try {
        return res.status(200).json('getCarsByBrand');
    } catch (error) {
        return res.status(500).json(`Error (getCarsByBrand): ${error}`);
    }
};

const getCarsByDistance = (req, res, next) => {
    try {
        return res.status(200).json('getCarsByDistance');
    } catch (error) {
        return res.status(500).json(`Error (getCarsByDistance): ${error}`);
    }
};

const getCarsByOwner = (req, res, next) => {
    try {
        return res.status(200).json('getCarsByOwner');
    } catch (error) {
        return res.status(500).json(`Error (getCarsByOwner): ${error}`);
    }
};

const getCarsByRented = (req, res, next) => {
    try {
        return res.status(200).json('getCarsByRented');
    } catch (error) {
        return res.status(500).json(`Error (getCarsByRented): ${error}`);
    }
};

const createCar = (req, res, next) => {
    try {
        return res.status(200).json('createCar');
    } catch (error) {
        return res.status(500).json(`Error (createCar): ${error}`);
    }
};

const editCar = (req, res, next) => {
    try {
        return res.status(200).json('editCar');
    } catch (error) {
        return res.status(500).json(`Error (editCar): ${error}`);
    }
};

const deleteCar = (req, res, next) => {
    try {
        return res.status(200).json('deleteCar');
    } catch (error) {
        return res.status(500).json(`Error (deleteCar): ${error}`);
    }
};

module.exports = {
    getAllCars,
    getCarById,
    getCarsByBrand,
    getCarsByDistance,
    getCarsByName,
    getCarsByOwner,
    getCarsByRented,
    createCar,
    editCar,
    deleteCar,
};
