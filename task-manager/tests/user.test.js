const request = require('supertest');
const app = require('../src/app')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
// TODO: I don't think the ENV vars are working fine
console.log(process.env.NODE_ENV, "NODE ENV>>>")
console.log(process.env.MONGODB_URL);
console.log(process.env.PORT);
console.log(process.env.JWT_SECRET);

test('should signup new user', async () => {
    await request(app).post('/users').send({
        name: 'foo',
        email: 'foo@gmail.com',
        password: 'Password123!'
    }).expect(201)
})