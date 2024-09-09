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
        if(error.name == 'TypeError'){
            throw new AppError('Cannot create a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR)
        }
        throw error;
    }
}

module.exports = {
    createAirplane
};