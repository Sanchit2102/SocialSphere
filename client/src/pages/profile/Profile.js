import React from 'react'
import ProfileLeft from '../../components/profileleft/ProfileLeft'
import './Profile.css'
import ProfileCard from '../../components/profileside/profilecard/ProfileCard'
import PostSide from '../../components/postside/PostSide'
import RightSide from '../../components/rightside/RightSide'

const Profile = () => {
  return (
   <>
    <div className="Profile">
        <ProfileLeft/>
        <div className="Profile-center">
        <ProfileCard location={"profilePage"}/>
        <PostSide/>
        </div>
        <RightSide/>
        
        
    </div>
   </>
  )
}

export default Profile