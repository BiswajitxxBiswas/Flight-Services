const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
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

async function getAllFlights(query) {
    //trips ='MUM-DEL'
    let customFilter = {};
    let sortFilter = [];
    const endTripTime = "T23:59:00Z";
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between] : [minPrice,((maxPrice == undefined)? 20000 : maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between] : [query.tripDate , query.tripDate+ endTripTime]
        }
    }
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Can not Fetch data of All flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getAllFlights,
};