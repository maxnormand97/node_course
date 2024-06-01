const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// pass in args from command line
const searchPlace = process.argv[2]
if (!searchPlace) {
    return console.log('NO SEARCH')
}
geocode(searchPlace, (err, {latitude, longitude, location}) => {
    if (err){
        return console.log('error', err)
    }
    forecast(latitude, longitude, (err, forecastData) => {
        if (err) {
            return console.log('error', err)
        } else {
            return console.log(forecastData + location)
        }
    })
})