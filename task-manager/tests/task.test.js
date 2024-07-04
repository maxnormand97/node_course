const request = require('supertest');
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, userOneId, setupDatabase, userTwo, userTwoId, taskOne } = require('./fixtures/db')

// run async with a promise each time a test block runs
beforeEach(setupDatabase)


test('should create a task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'fooby doo doo'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task.description).toBe('fooby doo doo')
    expect(task.completed).toEqual(false)
})

// get tasks
test('should return tasks for correct user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toEqual(2)
})

// security test for deletion
test('should not be able to delete tasks you do not own', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})
