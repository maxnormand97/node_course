const express = require('express')
// load other files when the server starts
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000
// to use middleware use .use() function and pass in a callback
// the middleware function needs to finish, if you don't
// define next it will hang
// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('a message')
//     } else {
//         next()
//     }
// })

// Example of function that you could use to block all requests
// in a maintenance mode setting
// app.use((req, res, next) => {
//     const maintenanceMode = false
//     if(maintenanceMode) {
//         res.status(503).send()
//     } else {
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//

app.listen(port, () => {
    console.log('Running application')
})

// BCRYPT example
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Foo12345!'
//     // hash takes in a string and how hectic the pw gets encrypted
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)
//     // how login works by comparing the input and the output of the hash
//     const isMatch = await bcrypt.compare(password, hashedPassword)
//     console.log(isMatch)
// }

// myFunction()

// JWT example
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     // creates the token, takes in an id and a secret and expiry time
//     const token = jwt.sign({ _id: 'abc123' }, 'thisisrandom', { expiresIn: '1 day' })
//     console.log(token)
//     // takes in the token and the secret
//     // will return if auth is valid or not
//     const data = jwt.verify(token, 'thisisrandom')
//     console.log(data)
// }

// myFunction()