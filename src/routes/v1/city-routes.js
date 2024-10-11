const express = require('express');
const {CityController} = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares');

const router = express.Router();

router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.CreateCity
);
router.get('/',CityController.getAllCities);

module.exports = router;