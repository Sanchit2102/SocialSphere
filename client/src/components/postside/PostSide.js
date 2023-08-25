import React from 'react'
import PostShare from './postShare/PostShare'
import './PostSide.css'
import Posts from './posts/Posts'

const PostSide = () => {
  return (
    <div className="PostSide">
      <PostShare/>
      <Posts/>
    </div>
  )
}

export default PostSide