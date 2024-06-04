// actually calls just a function which we then call to make
// another application
// require core modules before imported
const path = require('path')
const express = require('express')
const hbs = require('hbs')
// store it in app var
const app = express()
// the core node module for helping make paths to serve assets is path
// Paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//tell what view engine to use for express
// Setup handle bars and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
// set up config for partials path
hbs.registerPartials(partialsPath)
// helps to serve up assets, this also serves the assets for root route
// Setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    // allows you to render one of your views / templates from hbs
    // second args you can pass in props for the view
    res.render('index', {
        title: 'Weather App',
        author: 'foo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'foo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'foo'
    })
})


// sets up get route and what request to send back
app.get('/weather', (req, res) => {
    res.send(
        {
            forecast: 'bad',
            location: 'somewhere'
        }
    )
})
// specific 404 pages for things like not found records
app.get('/help/*', (req, res) => {
    res.send('nothing for this yet')
})
// handle 404's
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page here',
        author: 'foo'
    })
})

// starts the server
// might want to change this cause of rails...
app.listen(8000, () => {
    console.log('starting server')
})