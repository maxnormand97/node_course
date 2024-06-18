const express = require('express')
require('../db/mongoose')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// GET '/tasks'
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// GET :id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'invalid update'})
    }

    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        // const task = await Task.findById(_id)``
        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DESTROY '/tasks/:id'
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// POST '/tasks'
// add in middleware to have access to the user to link
// to the task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        // copies all the options over from original
        // task post body
        ...req.body,
        // we can get user id from headers / middleware
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router