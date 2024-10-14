const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');
const {compareTime} = require('../utils/helpers/datetime-helper');
const AppError = require('../utils/errors/app-errors');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        // Check if departure time is before arrival time
        if (compareTime(data.departureTime,data.arrivalTime)) {
            throw new AppError('Departure time cannot be after or same as arrival time', StatusCodes.BAD_REQUEST);
        };
        const flight = await flightRepository.create(data); 
        return flight;
    } catch (error) {
        console.log(error);
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => { 
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
};