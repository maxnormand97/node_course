const mongoose = require('mongoose')
const validator = require('validator');

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

module.exports = User

// // create instance of me
// const me = new User({
//     name: 'bar',
//     email: 'bar@gmail.com',
//     password: 'hellojamaca',
//     age: 13
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })