const express = require('express');
const {AirportController} = require('../../controllers');
const {AirportMiddleware} = require('../../middlewares');

const router = express.Router();

router.post('/',
    AirportMiddleware.validateCreateRequest,
    AirportController.createAirport
);

//api/v1/airports/  GET
router.get('/',AirportController.getAirports);

//api/v1/airports/:id  GET
router.get('/:id',AirportController.getAirport);

//api/v1/airports/:id  DELETE 
router.delete('/:id',AirportController.destroyAirport);

//api/v1/airports/:id  PATCH 
router.patch('/:id',AirportController.updateAirport);

module.exports = router;
