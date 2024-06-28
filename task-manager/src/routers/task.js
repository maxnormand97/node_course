const express = require('express')
require('../db/mongoose')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// GET '/tasks'
// to support pagination use limit or skip
// /tasks?limit=10&skip=20
// to use sort '/tasks?sortBy={params}'
router.get('/tasks', auth, async (req, res) => {
    let tasks = []
    // manipulate what comes back to the user by
    // looking at the query string
    // FOR SORTING
    // const sort = {};
    // if (req.query.sortBy) {
    //     const parts = req.query.sortBy.split(':');
    //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    // }

    // tasks = await Task.find({
    //     owner: req.user._id,
    //     completed: isCompleted
    // })
    // .limit(parseInt(req.query.limit))
    // .skip(parseInt(req.query.skip))
    // .sort(sort);
    if (req.query.completed) {
        const isCompleted = req.query.completed.toLowerCase() === 'true';
        // const tasks = await Task.find(match).limit(1).skip(1)
        // TODO: try to figure out how to use sort in this
        tasks = await Task.find({
            owner: req.user._id,
            completed: isCompleted
        }).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
    } else {
        tasks = await Task.find({
            owner: req.user._id
        })
    }

    try {
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