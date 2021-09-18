const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const usersRouter = require('express').Router()
const logger = require('../utils/logger.js')


usersRouter.post('/', async (request, response) => {
  const body = request.body
  const password = body.password
  if (!password || password.length < 3) {
      return response.status(400).send({error:'password must be at least 3 characters long'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

module.exports = usersRouter