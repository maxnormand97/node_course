const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    // create FK field to link with another model
    owner: {
        // set it to a mongoose ID type
        type: mongoose.Schema.Types.ObjectId,
        required: true, // meaning it is not optional
        ref: 'User' // to link it up with the model
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
