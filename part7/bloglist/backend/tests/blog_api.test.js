const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

/** To finish tests for token auth and login  */

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('verify blogs id prop', () => {
  test('blogs have unique "id" instead of mongo default "_id"', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    console.log(blogs)
    expect(blogs[0].id).toBeDefined()
  })
})

describe('post blog to database', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: 'A test blog with a title',
      author: 'supertest api test for post',
      url: 'www.test.com?',
      likes: 5,
    }
    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAfterAddition = await helper.blogsInDB()
    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfterAddition.map((n) => n.title)
    const authors = blogsAfterAddition.map((n) => n.author)
    expect(titles).toContain('A test blog with a title')
    expect(authors).toContain('supertest api test for post')
  })

  test('if likes not set, defaults to 0 likes after adding new blog', async () => {
    const newBlog = {
      title: 'Blog with no likes',
      author: 'author has no likes',
      url: 'www.test.com?',
    }

    await api.post('/api/blogs').send(newBlog).expect(201)
    const blogsAfterAddition = await helper.blogsInDB()
    const latestBlog = await Blog.findOne({ title: 'Blog with no likes' })
    expect(latestBlog.likes).toBe(0)
  })

  test('if title or url are missing from the request, server responds with 400 bad request', async () => {
    const newBlog = {
      author: 'author has no likes',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('remove blog from database', () => {
  test('removing a blog by id', async () => {
    const blogs = await helper.blogsInDB()
    const blogToRemove = blogs[0]

    await api.delete(`/api/blogs/${blogToRemove.id}`).expect(204)

    const blogsAfterDelete = await helper.blogsInDB()
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('update blog id', () => {
  test('update number of likes', async () => {
    const blogs = await helper.blogsInDB()
    const updatedBlog = blogs[0]
    updatedBlog.likes = 100

    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200)

    const blogsAfterUpdate = await helper.blogsInDB()
    expect(blogsAfterUpdate[0].likes).toBe(100)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
