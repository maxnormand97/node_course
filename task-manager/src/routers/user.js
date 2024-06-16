const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// POST '/users'
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    // has to do this before anything
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// LOGIN users
router.post('/users/login', async (req, res) => {
    try {
        // can define custom methods for the user we would do this in the mongoose model
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // this will be an instance method
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

// get user profile
// to use middleware just pass in your middleware function
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// GET :id
router.get('/users/:id', async (req, res) => {
    // get one record
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'invalid update'})
    }

    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        // loop through the update keys and then update according to the params
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        // updates from params and returns the new user and runs validations
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DESTROY '/user/:id'
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router