const mongoose = require('mongoose')
const helpers = require('./test_helpers')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "kummitusjuttuja",
    author: "A. Aave",
    url: "mystinen/osoite",
    likes: 6,
  },
  {
    title: "miten käännytään vasemmalle",
    author: "Aina Oikea ",
    url: "vaara/suunta",
    likes: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const api = supertest(app)

test('blogitiedot palautetaan json-muodossa', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('kaikki blogit palautetaan', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('validi blogitieto lisätään', async () => {
  const newBlog = {
    title: "miten lisätään blogitieto tietokantaan",
    author: "Blogin pitäjä",
    url: "talla/paasee/perille",
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(blogitieto => {
    console.log(blogitieto.title)
    return blogitieto.title
  })

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'miten lisätään blogitieto tietokantaan'
  )
})

test('blogitieto voidaan deletoida', async () => {
  const blogsAtStart = await helpers.blogsInDb() 
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helpers.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helpers.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})