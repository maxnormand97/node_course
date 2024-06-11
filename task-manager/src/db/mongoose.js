const mongoose = require('mongoose')
const validator = require('validator');
const password = encodeURIComponent('RG1oUkxSZGd5');
const uri = `mongodb+srv://Cluster90814:${password}@cluster90814.jh7ruul.mongodb.net/task-manager-api?retryWrites=true&w=majority&appName=Cluster90814`
mongoose.connect(uri);

// set up basic model
const User = mongoose.model('User', {
    // set up attributes as objects
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            // call library validations in the validation
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.includes('password')){
                throw new Error('Password invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        // custom validations
        validate(value) {
            if (value < 0) {
                throw new Error('Age cannot be negative')
            }
        }
    }
})
// // create instance of me
const me = new User({
    name: 'bar',
    email: 'bar@gmail.com',
    password: 'hellojamaca',
    age: 13
})

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const testTask = new Task({
    description: "I am the first",
    completed: false
})

// testTask.save().then((testTask) => {
//     console.log(testTask)
// }).catch((error) => {
//     console.log(error)
// })