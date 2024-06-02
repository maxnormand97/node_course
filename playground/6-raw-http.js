// there are other core modules for http requests
const http = require('http')

const url = `http://api.weatherstack.com/current?access_key=604a3c56a4b09f3203cda0ce80fb0041&query=45,-75`

// need to assign the request
const request = http.request(url, (res) => {
    let data = ''
    // important function when this data comes back this fires
    res.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(data, '>>>DATA')
    })
    // when the request ends
    res.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (err) => {
    console.log('Something went wrong', err)
})

// done setting up request then it will fire
request.end()

// theres a lot to do here which is why we use other modules eg axios
