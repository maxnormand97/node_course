const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

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

// LOGOUT
router.post('/users/logout', auth, async (req, res) => {
    // logging out we need to consider sessions on other devices
    // we don't want to sign the user out of everything
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

// LOGOUT ALL
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
// get user profile
// to use middleware just pass in your middleware function
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// GET :id
// router.get('/users/:id', async (req, res) => {
//     // get one record
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'invalid update'})
    }
    try {
        // loop through the update keys and then update according to the params
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DESTROY '/user/:id'
// NOTE: do not use id param for deleting things that don't belong to the entity
router.delete('/users/me', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    // config goes here
    // dest: 'images', don't enable this if you are saving the file against a model
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // you can use regex to specify what files to include and prohibit
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please use jpg'))
        }
        cb(undefined, true)
    }
})


// POST uploads
// you can have as many middleware functions as you want
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // use sharp to convert things
    const buffer = await sharp(req.file.buffer).resize({width: 200, height: 200}).png().toBuffer()
    // how to get access to the file binary passed in
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// delete uploads
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    try {
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET avatar
// TODO: need to test this
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params._id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        // need to tell the requestor the type of data it is
        // you can do that by setting the response header
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router