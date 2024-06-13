require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('666871b8237ce847166c4e09').then((task) => {
//     console.log(task)

//     return Task.find({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    console.log(task)
    const todoTasks = await Task.find({completed: false})
    return todoTasks
}

deleteTaskAndCount('6669c5e69da70689583c47c7').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})