const request = require('request')

const forecast = (lat, long, callback) => {
    console.log('getting to functino?')
    const url = `http://api.weatherstack.com/current?access_key=604a3c56a4b09f3203cda0ce80fb0041&query=${encodeURIComponent(lat.toString())},=${encodeURIComponent(long.toString())}`

    request({ url: url, json: true}, (err, res) => {
        console.log(res,  'RES')
        if(err) {
            callback('network issue', undefined)
            callback
        } else if (res.body.error) {
            callback('data issue', undefined)
        }
        else {
            const temp = res.body.current.temperature
            const rain = res.body.current.precip
            // console.log(`Its ${temp} with a change of ${rain} rain`)
            callback(undefined, `Its ${temp} with a change of ${rain} rain`)

        }
     })
}

module.exports = forecast