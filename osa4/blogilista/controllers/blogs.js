const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate("user", {username: 1, name: 1, id: 1})
        response.json(blogs.map(blog => blog.toJSON()))
      
    })

blogsRouter.post('/', async (request, response, next) => {
        const body = request.body 
        const token = getTokenFrom(request) //lisäsin tämän kun sitä ei ollut, en huomannut missä välissä olisi pitänyt lisätä
        //const user = await User.findById("5ed0ef3d3e7b7f07609f5b1a") //toinen (body.userId)
    
        const decodedToken = jwt.verify(token, process.env.SECRET) //TÄSTÄ TULEE VALITUS!
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog =  new Blog ( {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id //user
        })
        
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
//      .catch(error => next(error))
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