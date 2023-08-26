import React, { useState } from 'react'
import "./FollowersCard.css";
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../../action/UserAction.js';
import Profile from '../../../img/profileImg.png'
import Message from '../../../img/comment.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const User = ({person}) => {
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector(
    (state) =>
      state.authReducer.authData?.user || state.authReducer.authData?.newUser
  );
  console.log(user)
  const [following, setFollowing] = useState( person.followers.includes(user._id));


const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
const handleFollow = () => {
  following
    ? dispatch(unfollowUser(person._id, user))
    : dispatch(followUser(person._id, user));
  setFollowing((prev) => !prev);
};

const handleClick =async()=>{
  const { data } = await axios.post('https://socialsphere-lxw6.onrender.com/chat', {
    senderId: user._id,
    receiverId: person._id
  });
  console.log(data)
  if(data.success){
    navigate('/chat')
  }
  
}
  return (
    <>
         <div className="follower">
            <div>
              <img
          src={
            person.profilePicture? publicFolder+person.profilePicture:Profile
          }
          alt="profile"
          className="follower-img"
        />
                <div className="name">
                    <span>{person.firstname} {person.lastname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-btn unfollow':'button fc-btn'} onClick={handleFollow}> {following ? "Unfollow" : "Follow"}</button>
            {following ? <img src={Message} alt='' onClick={handleClick}></img>:''}
        </div>
    </>
  )
}

export default User;