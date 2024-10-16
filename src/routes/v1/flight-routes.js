const express = require('express');
const {FlightController} = require('../../controllers');
const {FlightMiddleware} = require('../../middlewares');

const router = express.Router();

router.post('/',
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight
);

//api/v1/flights?trips='MUM-DEL' GET
router.get('/',FlightController.getAllFlights)

//api/v1/flights/:id  GET
router.get('/:id',FlightController.getFlight);


module.exports = router;
