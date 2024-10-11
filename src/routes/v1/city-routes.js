const express = require('express');
const {CityController} = require('../../controllers');

const router = express.Router();

router.post('/',CityController.CreateCity);
router.get('/',CityController.getAllCities);

module.exports = router;