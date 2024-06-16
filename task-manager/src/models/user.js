const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// you have to use a schema to make use of middleware functions (callbacks)
const userSchema = new mongoose.Schema({
    // set up attributes as objects
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:  true, // ensure that email should always be uniq
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
    },
    // you'll want to save user tokens, one for each device they could have
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
// with separate schemas we can attach methods with the following
// this is how you make class method
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// this is how you make instance methods
userSchema.methods.generateAuthToken = async function () {
    const user = this
    // create new token
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')
    // add token to user tokens instance
    user.tokens = user.tokens.concat({ token: token })
    // save user
    await user.save()
    return token
}

// pass a separate schema to take advantage of middleware

// define callback event for before a model is saved
userSchema.pre('save', async function (next) {
    const user = this

    // check if a PW has already been set
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // we use the next to let the function know when we are done
    // if we don't cause its async it will just hang
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

// // create instance of me
// const me = new User({
//     name: 'bar',
//     email: 'bar@gmail.com',
//     password: 'hellojamaca',
//     age: 13
// })