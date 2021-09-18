const User = require('../models/user.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper.js')
const { after } = require('lodash')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({
          username: "test",
          name: "testname",
          passwordHash: await bcrypt.hash('secret', 10)
      })
      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
          username: "newUser",
          name: "works",
          password: "mypassword"
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const userNames = usersAtEnd.map(u => u.username)
      expect(userNames).toContain(newUser.username)

    },100000)

    test('creation fails with proper statuscode and message if username already taken', async () => {
        usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "test",
            name: "notwork",
            password: "thisissecret"
        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect("Content-Type", /application\/json/)
        
        expect(result.body.error).toContain('`username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too short', async () => {
        usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "pi",
            name: "notwork",
            password: "thisissecret"
        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect("Content-Type", /application\/json/)
        
        expect(result.body.error).toContain('`username` (`pi`) is shorter than the minimum allowed length (3)')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with status 400 and with a proper message if password is not long enough', async () => {
        usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "testing",
            name: "notwork",
            password: "no"
        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect("Content-Type", /application\/json/)
        
        expect(result.body.error).toContain('password must be at least 3 characters long')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})