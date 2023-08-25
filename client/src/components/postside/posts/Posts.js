import React, { useEffect, useState } from "react";
import "./Posts.css";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../../action/postAction";

import Post from "./post/Post";

const Posts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(
    (state) =>
      state.authReducer.authData?.user || state.authReducer.authData?.newUser
  );

  let { posts, uploading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)

  return (
    <div className="Posts">
      {!posts || posts.length === 0 ? (
        <h4>Post not available</h4>
      ) : uploading ? (
        <p>Fetching Posts</p>
      ) : (
        posts.map((p, i) => (
          <>
          <Post data={p} i={i}/>
          </>
        ))
      )}
    </div>
  );
};

export default Posts;
