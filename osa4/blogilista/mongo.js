const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://bloggari:jeez123@cluster0-knjqv.mongodb.net/blogilista?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'runoja',
    author: 'Risto Rasa',
    url: 'runo/blogin/osoite',
    likes: 55
})

blog.save().then(response => {
  console.log('Blogitiedot tallennettu!')
  mongoose.connection.close()
})