require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express')
// load other files when the server starts
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
// const port = process.env.PORT || 8000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app
