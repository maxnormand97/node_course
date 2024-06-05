const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoibWF4bm9ybWFuZCIsImEiOiJjbHd0YTExZmkwMWQ3MmtyM2VwdmFpdzZ2In0.C_Hd1QI0zRPe3oM5rfrHWw&limit=1`

    request({ url, json: true}, (err, { body }) => {
       if(err) {
           callback('could not connect to api', undefined)
       } else if (body.features.length === 0) {
           callback('bad data', undefined)
       } else {
           callback(undefined, {
               longitude: body.features[0].properties.coordinates.longitude,
               latitude: body.features[0].properties.coordinates.latitude,
               location: body.features[0].properties.full_address
           })
       }
    })
}

module.exports = geocode