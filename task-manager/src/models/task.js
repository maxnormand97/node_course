const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
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
})

module.exports = Task
