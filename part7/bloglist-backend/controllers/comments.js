const Comment = require('../models/comment')
const commentRouter = require('express').Router()

commentRouter.get('/', async (request, response) => {
    const comments = await Comment.find({})
    response.json(comments)
})

module.exports = commentRouter
  