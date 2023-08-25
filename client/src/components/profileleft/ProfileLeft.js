import React from 'react';
import LogoSearch from '../profileside/logosearch/LogoSearch'
import FollowersCard from  '../profileside/followerscard/FollowersCard'
import InfoCard from './Infocard/InfoCard';
import '../profileside/ProfileSide.css'

const ProfileLeft = () => {
  return (
    <>
        <div className="ProfileSide">
          <LogoSearch/>
          <InfoCard/>
          <FollowersCard/>
        </div>
    </>
  )
}

export default ProfileLeft