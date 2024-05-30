const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// const url = "http://api.weatherstack.com/current?access_key=604a3c56a4b09f3203cda0ce80fb0041&query=37.8267,=122.4233"
// const geocodeUrl = "https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1IjoibWF4bm9ybWFuZCIsImEiOiJjbHd0YTExZmkwMWQ3MmtyM2VwdmFpdzZ2In0.C_Hd1QI0zRPe3oM5rfrHWw&limit=1"

forecast(37.8267, 122.4233, (err, data) => {
    console.log('error', err)
    console.log('data', data)
})


// common convention for callbacks is to include err and data as args
// geocode('yamba', (err, data) => {
//     console.log('error', err)
//     console.log('data', data)
// })