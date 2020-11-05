import React, { useState } from 'react'
const Blog = ({ blog, like }) => {
  const [kaikkiTiedot, setKaikkiTiedot] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')
//  const [liked, setLiked] = useState(null)
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

  const likeHandler = () => {
    like()
    console.log('like-napin eventhandleri (ei oikeasti lisätä)')
  }

  return(
    <div className='blogi' style={blogStyle}>
      {blog.title} {blog.author}
      <button
        onClick={toggleButtonLabel}>{buttonLabel}</button>
      <div className='bloginPiilotettavat' style={showWhenVisible}>
        {blog.url}
        <div>
          likes: {blog.likes} <button className='like' onClick={likeHandler}>like</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
