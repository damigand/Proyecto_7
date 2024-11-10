const Rent = require('../models/Rent');
const User = require('../models/User');
const Car = require('../models/Car');

const getAllRents = async (req, res, next) => {
    try {
        const rents = await Rent.find({ approved: true })
            .populate('carOwner', 'username')
            .populate({ path: 'rentedCar', select: '-_id name brand year distance' })
            .populate('rentedBy', 'username');

        return res.status(200).json(rents);
    } catch (error) {
        return res.status(500).json(`Error (getAllRents): ${error}`);
    }
};

const getRentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rent = await Rent.findById(id)
            .populate('carOwner', 'username')
            .populate({ path: 'rentedCar', select: '-_id name brand year distance' })
            .populate('rentedBy', 'username');

        return res.status(200).json(rent);
    } catch (error) {
        return res.status(500).json(`Error (getRentById): ${error}`);
    }
};

const getRentByCarId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rents = await Rent.find({ rentedCar: id, approved: true })
            .populate('carOwner', 'username')
            .populate({ path: 'rentedCar', select: '-_id name brand year distance' })
            .populate('rentedBy', 'username');

        return res.status(200).json(rents);
    } catch (error) {
        return res.status(500).json(`Error (getRentByCarId): ${error}`);
    }
};

const getRentByRenterId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rents = await Rent.find({ rentedBy: id, approved: true })
            .populate('carOwner', 'username')
            .populate({ path: 'rentedCar', select: '-_id name brand year distance' })
            .populate('rentedBy', 'username');

        return res.status(200).json(rents);
    } catch (error) {
        return res.status(500).json(`Error (getRentByRenterId): ${error}`);
    }
};

const getRentByActive = async (req, res, next) => {
    try {
        const { active } = req.params;
        const rents = await Rent.find({ active: active, approved: true })
            .populate('carOwner', 'username')
            .populate({ path: 'rentedCar', select: '-_id name brand year distance' })
            .populate('rentedBy', 'username');

        return res.status(200).json(rents);
    } catch (error) {
        return res.status(500).json(`Error (getRentByActive): ${error}`);
    }
};

const getRentByApproved = async (req, res, next) => {
    try {
        const { approved } = req.params;

        if (approved == 'true') {
            const rents = await Rent.find({ approved: approved })
                .populate('carOwner', 'username')
                .populate({ path: 'rentedCar', select: '-_id name brand year distance' })
                .populate('rentedBy', 'username');
            return res.status(200).json(rents);
        }

        if (!req.user || req.user.role != 'admin') {
            return res.status(401).json('Unauthorized: Only administrators can see unapproved cars.');
        }

        const rents = await Rent.find({ approved: approved })
            .populate('carOwner', 'username')
            .populate({ path: 'rentedCar', select: '-_id name brand year distance' })
            .populate('rentedBy', 'username');
        return res.status(200).json(rents);
    } catch (error) {
        return res.status(500).json(`Error (getRentByApproved): ${error}`);
    }
};

const createRent = async (req, res, next) => {
    try {
        const carId = req.body.carId;
        const userId = req.body.userId;

        const carCheck = await Car.findById(carId);
        if (!carCheck) return res.status(404).json('No car was found with that id.');

        const userCheck = await User.findById(userId);
        if (!userCheck) return res.status(404).json('No user was found with that id.');

        if (carCheck.owner == userCheck.id) return res.status(401).json("Users can't rent their own car.");

        const rent = new Rent({
            carOwner: carCheck.owner,
            rentedCar: carId,
            rentedBy: userId,
        });

        if (req.user.role == 'admin') {
            rent.active = req.body.active;
            rent.approved = req.body.approved;
        }

        carCheck.rented = true;
        await carCheck.save();
        await rent.save();

        await rent.populate('carOwner', 'username');
        await rent.populate({ path: 'rentedCar', select: '-_id name brand year distance' });
        await rent.populate('rentedBy', 'username');

        return res.status(201).json(rent);
    } catch (error) {
        return res.status(500).json(`Error (createRent): ${error}`);
    }
};

const editRent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rent = await Rent.findById(id);

        if (!rent) return res.status(404).json("Couldn't find the rent.");

        if (req.user.role == 'admin') {
            rent.rentedCar = req.body.rentedCar || rent.rentedCar;
            rent.rentedBy = req.body.rentedBy || rent.rentedBy;
            rent.active = req.body.active || rent.active;
            rent.approved = req.body.approved || rent.approved;

            await rent.save();

            await rent.populate('carOwner', 'username');
            await rent.populate({ path: 'rentedCar', select: '-_id name brand year distance' });
            await rent.populate('rentedBy', 'username');

            return res.status(200).json(rent);
        }

        return res.status(401).json('Only administrators can edit rents.');
    } catch (error) {
        return res.status(500).json(`Error (editRent): ${error}`);
    }
};

const deleteRent = async (req, res, next) => {
    try {
        if (req.user.role == 'admin') {
            const { id } = req.params;
            await Rent.findByIdAndDelete(id);
            return res.status(200).json('Rent successfully deleted.');
        }

        return res.status(401).json('Only administrators can delete rents.');
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
