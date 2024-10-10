const express = require('express');
const {AirplaneController} = require('../../controllers');
const {AirplaneMiddleware} = require('../../middlewares');

const router = express.Router();

router.post('/',
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane
);

//api/v1/airplanes/  GET
router.get('/',AirplaneController.getAirplanes);

//api/v1/airplanes/:id  GET
router.get('/:id',AirplaneController.getAirplane);

//api/v1/airplanes/:id  DELETE 
router.delete('/:id',AirplaneController.destroyAirplane);

//api/v1/airplanes/:id  PATCH 
router.patch('/:id',AirplaneController.updateAirplane);

module.exports = router;
