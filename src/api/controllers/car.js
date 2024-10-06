const Car = require('../models/Car');
const User = require('../models/User');

const getAllCars = async (req, res, next) => {
    try {
        const cars = await Car.find();
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(`Error (getAllCars): ${error}`);
    }
};

const getCarById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json(`Error (getCarById): ${error}`);
    }
};

const getCarsByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const cars = await Car.find({ name: { $regex: name, $options: 'i' } });

        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(`Error (getCarsByName): ${error}`);
    }
};

const getCarsByBrand = async (req, res, next) => {
    try {
        const { brand } = req.params;
        const cars = await Car.find({ brand: { $regex: brand, $options: 'i' } });

        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(`Error (getCarsByBrand): ${error}`);
    }
};

const getCarsByDistance = async (req, res, next) => {
    try {
        const { km } = req.params;
        const cars = await Car.find({ distance: { $gte: km } });

        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(`Error (getCarsByDistance): ${error}`);
    }
};

const getCarsByOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cars = await Car.find({ ownerId: id });

        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(`Error (getCarsByOwner): ${error}`);
    }
};

const getCarsByRented = async (req, res, next) => {
    try {
        const { rented } = req.params;
        const cars = await Car.find({ rented: rented });

        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(`Error (getCarsByRented): ${error}`);
    }
};

const createCar = async (req, res, next) => {
    try {
        const newCar = new Car({
            name: req.body.name,
            brand: req.body.brand,
            year: req.body.year,
            distance: req.body.distance,
            owner: req.user.id,
        });

        const car = await newCar.save();
        return res.status(201).json(car);
    } catch (error) {
        return res.status(500).json(`Error (createCar): ${error}`);
    }
};

const editCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldCar = await Car.findById(id);

        if (!oldCar) return res.status(404).json('No car was found.');

        const userEditing = await User.findById(req.user.id);

        if (userEditing.id == oldCar.owner || userEditing.role == 'admin') {
            oldCar.name = req.body.name || oldCar.name;
            oldCar.brand = req.body.brand || oldCar.brand;
            oldCar.year = req.body.year || oldCar.year;
            oldCar.distance = req.body.distance || oldCar.distance;

            const newCar = await oldCar.save();
            return res.status(200).json(newCar);
        }

        return res.status(401).json("Unauthorized: you can't edit this car.");
    } catch (error) {
        return res.status(500).json(`Error (editCar): ${error}`);
    }
};

const deleteCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) return res.status(404).json('No car was found.');

        const userDeleting = await User.findById(req.user.id);

        if (userDeleting.id == car.owner || userDeleting.role == 'admin') {
            await Car.deleteOne(car);
            return res.status(200).json('Car successfully deleted.');
        }

        return res.status(401).json("Unauthorized: you can't edit this car.");
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
