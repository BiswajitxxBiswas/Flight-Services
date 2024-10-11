const {City} =  require('../models');
const CrudRepository  = require('./crud-repository');

class CityRespository extends CrudRepository{
    constructor(){
        super(City);
    }
}

module.exports = CityRespository;