const {Sequelize, sequelize} = require('sequelize');

const CrudRepository = require("./crud-repository");
const {Flight , Airplane , Airport , City} = require('../models');
const db = require('../models');
const { addRowLoackOnFlights } = require('./queries');
const AppError = require('../utils/errors/app-errors');
const { StatusCodes } = require('http-status-codes');
const { error } = require('../utils/common/error-response');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where : filter,
            order : sort,
            include :
            [ 
                {
                    model : Airplane,
                    required : true,
                    as : 'airplaneDetails'
                },
                {
                    model : Airport,
                    required : true,
                    as : 'departureAirport',
                    on : {
                        col1 : Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=",Sequelize.col("departureAirport.code") )
                    },
                    include : {
                        model : City,
                        required : true
                    }
                },
                {
                    model : Airport,
                    required : true,
                    as : 'arrivalAirport',
                    on : {
                        col1 : Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=",Sequelize.col("arrivalAirport.code") )
                    },
                    include : {
                        model : City,
                        required : true
                    }
                }
            ]        
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true){
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLoackOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);

            if(dec == true && seats > flight.totalSeats ){
                await transaction.rollback();
                throw error;
            }
            
            if (+dec) {
                await flight.decrement('totalSeats', {by : seats});
            } else {
                await flight.increment('totalSeats', {by : seats});
            }

            await transaction.commit();
            return flight;

        } catch (error) {
            await transaction.rollback();
            return error;
        }
        
    }
} 

module.exports = FlightRepository;