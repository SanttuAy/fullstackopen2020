import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { Table, Form, Button } from 'react-bootstrap'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
      setMessage(`welcome ${user.name}`)
      setTimeout(() => {
      setMessage(null)
      }, 10000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm
        createBlog = {addBlog}
      />
    </Togglable>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${blogObject.newBlog} by ${blogObject.newAuthor} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <div>
      <Form  onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            //id='username'
            type="text"
            //value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            //id='password'
            type="password"
            //value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
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

  //ei oikeasti liketä
  const likeBlog = () => {
    setMessage('You liked the blog!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

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
    <div class="container">
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in
        <button
          type="submit"
          onClick={handleLogOut}>logout</button>
      </p>
      {blogForm()}
      <Table striped>
        <tbody>
          {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Blog key={blog.id} blog={blog} like={likeBlog} />
            </td>
          </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default App