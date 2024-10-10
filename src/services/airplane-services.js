const { StatusCodes } = require('http-status-codes');
const airplane = require('../models/airplane');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-errors');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data); 
        return airplane;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => { 
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const response = await airplaneRepository.getAll();
        return response;
    } catch (error) {
        throw new AppError('Can not Fetch data of All Airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const response = await airplaneRepository.get(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you request is not present",error.statusCode);
        }
        throw new AppError('Can not Fetch data of Airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
};