
const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=604a3c56a4b09f3203cda0ce80fb0041&query=${encodeURIComponent(lat)},=${encodeURIComponent(long)}`

    request({ url: url, json: true}, (err, res) => {
        if(err) {
            callback('network issue', undefined)
        } else if (res.body.error) {
            callback('data issue', undefined)
        }
        else {
            const temp = res.body.current.temperature
            const rain = res.body.current.precip
            callback(undefined, `Its ${temp} with a change of ${rain} rain`)
        }
     })
}

module.exports = forecast