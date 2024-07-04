const request = require('supertest');
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')

// run async with a promise each time a test block runs
beforeEach(setupDatabase)

test('should signup new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'bar',
        email: 'bar@gmail.com',
        password: 'Password123!'
    }).expect(201)

    // remember to assert things that are not just status codes
    // asset db
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assert response body
    expect(response.body.user.name).toBe('bar')
    // using direct matching
    expect(response.body).toMatchObject({
        user: {
            name: 'bar',
            email: 'bar@gmail.com'
        },
        token: user.tokens[0].token
    })
    // assert saved things
    expect(user.password).not.toBe('Password123!')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.user.tokens[1].token)
})

test('should not login non existent user', async () => {
    await request(app).post('/users/login').send({
        email: 'billbo@gmail.com',
        password: userOne.password
    }).expect(400)
})

test('should get profile for user', async () => {
    // need to ensure we set the auth headers for requests that need aut
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get stuff if no auth', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should remove account when auth', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const user = await User.findById(userOneId)
        expect(user).toBeNull()
})

test('should fail to remove account without auth', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

// testing file uploads
// will be using fixtures namespace for this
test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/laptop.jpg') // use supertests attach to hook up files in requests
        .expect(200)

        // check data is saved
    const user = await User.findById(userOneId)
    // toBe uses triple equality ==== so {} is NOT = to {}
    expect(user.avatar).toEqual(expect.any(Buffer)) // checking the type of saved thing that its a file
})

// updates user field
test('should update user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'jimmy magoo'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('jimmy magoo')
})

test('should not update invalid fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        foo: 'jimmy magoo'
    })
    .expect(400)
})