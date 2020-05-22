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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}