const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8000
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index')
})

// start server
app.listen(port, () => {
    console.log('starting server')
})