function addRowLoackOnFlights(flightId){
    return `Select * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`
}

module.exports = {addRowLoackOnFlights};