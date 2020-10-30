import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [kaikkiTiedot, setKaikkiTiedot] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { display: kaikkiTiedot ? '' : 'none' } //jos false niin tuodaan esiin
  const toggleButtonLabel = () => {
    kaikkiTiedot ? setButtonLabel('view') : setButtonLabel('hide')
    toggleVisibility()
  }
  const toggleVisibility = () => { //vaihtaa näkymän päinvastaiseen
    setKaikkiTiedot(!kaikkiTiedot)
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button
        onClick={toggleButtonLabel}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <div>
          likes: {blog.likes} <button>like</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
