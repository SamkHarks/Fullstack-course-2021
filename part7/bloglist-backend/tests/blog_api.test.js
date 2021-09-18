const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const Comment = require('../models/comment.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helper = require('./test_helper.js')
const initialBlogs = helper.initialBlogs

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)     
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier property of the blog posts is named as id', () => {
    const newBlog = new Blog(initialBlogs[0])
    const blog = newBlog.toJSON()
    expect(blog.id).toBeDefined()
})



test('if the likes property is missing from the request, it will default to the value 0', () => {
    const blog = new Blog({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    })
    expect(blog.likes).toBe(0)
})


describe('when blogs are posted', () => {
    let headers
    beforeEach(async () => {
      await Comment.deleteMany({})
      await User.deleteMany({})
      const user = new User({
        username: "test",
        name: "testname",
        passwordHash: await bcrypt.hash('secret', 10)
      })
      const savedUser = await user.save()
      const userForToken = {
        username: savedUser.username,
        id: savedUser._id,
      }
      const userToken = jwt.sign(userForToken, process.env.SECRET)
      headers = {
        'Authorization': `bearer ${userToken}`
      }

    })
    test('a valid blog can be added', async () => {       
        const blog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }
    
        await api
          .post('/api/blogs')
          .set(headers)
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
        
        blogsAtEnd.forEach(b => {delete b.id; delete b.__v; delete b.user;});
        expect(blogsAtEnd).toContainEqual(blog)
    },100000)

    test('comment can be added', async () => {
      const blog = (await helper.blogsInDb())[0]
      const id = blog.id
      console.log('id', id, 'type', typeof id)
      const comment = {
        comment: 'something',
      }
      await api
        .post(`/api/blogs/${id}/comments`)
        .set(headers)
        .send(comment)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    }, 100000)

    test('title and url properties are missing from the request data, response should be status 400', async ()=> {    
        const blog = {
            author: "Edsger W. Dijkstra", 
            likes: 1
        }
        await api
          .post('/api/blogs')
          .set(headers)
          .send(blog)
          .expect(400)
    })

    test('adding a valid blog fails with the proper status code 401 Unauthorized if a token is not provided', async ()=> {
        const blog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }
    
        await api
          .post('/api/blogs')
          .send(blog)
          .expect(401)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('adding a valid blog fails with the proper status code 401 Unauthorized if wrong token is used', async ()=> {
        const blog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }
    
        await api
          .post('/api/blogs')
          .set('Authorization', 'bearer wrongtoken')
          .send(blog)
          .expect(401)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })
    
})


afterAll(() => {
  mongoose.connection.close()
})