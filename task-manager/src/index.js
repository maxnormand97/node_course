const app = require('./app')
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Running application')
})

// MIDDLEWARE
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

// const Task = require('./models/task')
// const User = require('./models/user')

// TODO: not working need to debug
// const main = async () => {
//     const task = await Task.findById('6670632cbfa7f99eae1044c7')
//     await task.populate('owner') // get access to the user instance
//     console.log(task.owner)
// }

// main()
// TODO: not working
// const main = async () => {
//     const user = await User.findById('6670671878e47a1f437860e1')
//     console.log(user)
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()

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

// FIlE UPLOADS
// const multer = require('multer')
// const upload = multer({
//     // config goes here
//     dest: 'images',
//     // set limits like size
//     limits: {
//         fileSize: 5000000
//     },
//     // inbuilt filtering function
//     fileFilter(req, file, cb) {
//         // you can use regex to specify what files to include and prohibit
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please use jpg'))
//         }

//         cb(undefined, true)
//     }
// })
// // put in the multer middleware
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })