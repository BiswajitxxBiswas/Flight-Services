const {CityRespository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-errors');

const cityRespository = new CityRespository();

async function createCity(data) {
    try {
        const city = await cityRespository.create(data);
        return city;
    } catch (error) {
        if (error.name == 'SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        
        throw new AppError('Cannot create a new City Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities() {
    try {
        const cities = await cityRespository.getAll();
        return cities;
    } catch (error) {
        throw new AppError('Can not Fetch data of All Cities',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRespository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The City you requested to delete is not present",error.statusCode);
        }
        throw new AppError('Can not Delete City',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try {
        const response = await cityRespository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The City you requested to update is not present",error.statusCode);
        }
        throw new AppError('Can not Update City',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createCity,
    getCities,
    destroyCity,
    updateCity
}
