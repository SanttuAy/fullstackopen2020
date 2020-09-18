import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
      setBlogs(initialBlogs)
      )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      //console.log(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    }

  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${newBlog} by ${newAuthor} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogOut = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      setMessage('something went wrong with logging out')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
          <input
          type="text"
          value={newBlog}
          name="NewBlog"
          onChange={({ target }) => setNewBlog(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={newUrl}
          name="NewUrl"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        {loginForm()}
      </div>
    )  
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in 
      <button 
      type="submit"
      onClick={handleLogOut}>logout</button>
      </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App