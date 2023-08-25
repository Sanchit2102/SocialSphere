import React from 'react'
import './ProfileSide.css'
import LogoSearch from './logosearch/LogoSearch'
import ProfileCard from './profilecard/ProfileCard'
import FollowersCard from './followerscard/FollowersCard'

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard location={'homePage'}/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileSide