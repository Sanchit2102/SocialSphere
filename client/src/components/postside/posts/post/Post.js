import React,{useState} from 'react'
import Comment from "../../../../img/comment.png";
import Share from "../../../../img/share.png";
import Heart from "../../../../img/like.png";
import NotLike from "../../../../img/notlike.png";
import {useSelector} from 'react-redux'
import { likePost } from '../../../../api/PostRequest';

const Post = ({data,i}) => {
 
  const user = useSelector(
    (state) =>
      state.authReducer.authData?.user || state.authReducer.authData?.newUser
  );

  const [liked, setLiked] = useState(data.likes ? data.likes.includes(user._id) : false);

  const [likes,setLikes] = useState(data.likes ?data.likes.length:"")

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    setLikes((prev) => (liked ? prev - 1 : prev + 1)); 
  };
  

  return (
    <>
       <div className="Post" key={i} >
            <img
              src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
              alt=""
            />
            <div className="postReact">
              <img
                src={liked ? Heart : NotLike}
                alt=""
                style={{ width: "34px", aspectRatio: "4/4" ,cursor:'pointer'}}
                onClick={handleLike}
              />
              <img src={Comment} alt="" />
              <img src={Share} alt="" />
            </div>
            <span style={{ color: "var(--gray)", fontSize: "13px" }}>
              {likes} likes
            </span>
            <div className="detail">
              <span>
                <b>{data.name}</b>
              </span>
              <span> {data.desc}</span>
            </div>
          </div> 
    </>
  )
}

export default Post;