import React from 'react';
import './ProfileCard.css';
import Cover from '../../../img/cover.jpg';
import Profile from '../../../img/profileImg.png';
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"

const ProfileCard = ({location}) => {
    const user = useSelector(
        (state) =>
          state.authReducer.authData?.user || state.authReducer.authData?.newUser
      );
      const serverPublic =process.env.REACT_APP_PUBLIC_FOLDER
    
      const posts = useSelector((state)=> state.postReducer.posts)

    const profilePage = false;
    
  return (
   <>
    <div className="ProfileCard">
        <div className="ProfileImages">
            <img src={user.coverPicture? serverPublic+user.coverPicture:Cover} alt="cover" />
            <img src={user.profilePicture? serverPublic+user.profilePicture:Profile} alt="cover" style={{background:"var(--buttonBg)"}}/>
        </div>
        <div className="ProfileName">
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt ? user.worksAt :"Write About Yourself"}</span>
        </div>
        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
                {location === 'profilePage' && <>

                    <div className="vl">

                    </div>
                    <div className="follow">
                        <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                        <span>Posts</span>
                    </div>
                </>}
            </div>
            <hr />
        </div>
        {location === 'profilePage' ? '' : <span>
           <Link to={`/profile/${user._id}`}>
           My Profile</Link>
        </span>}
        
    </div>
   </>
  )
}

export default ProfileCard