const {CityServices} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common');

async function CreateCity(req,res) {
    try {
        const city = await CityServices.createCity({
            name : req.body.name,
        });
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getAllCities(req,res) {
    try {
        const cities = await CityServices.getCities();
        SuccessResponse.data = cities;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    CreateCity,
    getAllCities
}