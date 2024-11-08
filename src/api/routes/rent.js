const express = require('express');
const router = express.Router();
const controller = require('../controllers/rent');
const { isAuth } = require('../../middlewares/auth');

router.get('/', controller.getAllRents);

router.get('/:id', controller.getRentById);

router.get('/car/:id', controller.getRentByCarId);

router.get('/renter/:id', controller.getRentByRenterId);

router.get('/approved/:approved', isAuth, controller.getRentByApproved);

router.get('/active/:active', controller.getRentByActive);

router.post('/create', isAuth, controller.createRent);

router.put('/edit/:id', isAuth, controller.editRent);

router.delete('/delete/:id', isAuth, controller.deleteRent);

module.exports = router;
