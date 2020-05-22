const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
    })

blogsRouter.post('/', (request, response, next) => {
        const body = request.body 
        //console.log(body)

    
        const blog =  new Blog ( {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })
        
      blog
        .save()
        .then(savedBlog => {
          response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
    })

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})    

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
  const blogToBeUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blogToBeUpdated.toJSON())
  //  .then(updatedBlog => {
  //    response.json(updatedBlog.toJSON())
  } catch(error) { 
    next(error)
  }
})

    module.exports = blogsRouter