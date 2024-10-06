const express = require('express');
const router = express.Router();
const controller = require('../controllers/car');
const { isAuth } = require('../../middlewares/auth');

router.get('/', controller.getAllCars);

router.get('/:id', controller.getCarById);

router.get('/brand/:brand', controller.getCarsByBrand);

router.get('/distance/:km', controller.getCarsByDistance);

router.get('/name/:name', controller.getCarsByName);

router.get('/owner/:id', controller.getCarsByOwner);

router.get('/rented/:rented', controller.getCarsByRented);

router.post('/create', isAuth, controller.createCar);

router.put('/edit/:id', isAuth, controller.editCar);

router.delete('/delete/:id', isAuth, controller.deleteCar);

module.exports = router;
