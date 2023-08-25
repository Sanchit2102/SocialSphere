import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";
import Profile from "../../img/profileImg.png";

const Conversation = ({ data, currentUser,online }) => {
  const [userData, setUserData] = useState(null);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const getUserData = async (userId) => {
    try {
      const { data } = await getUser(userId);
      await setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    getUserData(userId);
  }, [data.members, currentUser]);


  return (
    <>
      <div className="follower conversation" style={{justifyContent:"flex-start"}}>
        <div>
          <div className="online-dot"></div>
          <img
            src={
              userData?.profilePicture
                ? publicFolder + userData.profilePicture
                : Profile
            }
            alt=""
            className="follower-img"
            style={{width:"50px",height:"50px"}}
          />
        </div>
        <div className="name" style={{fontSize:"0.8rem"}}>
            <span>{userData?.otherDetails.firstname} {userData?.otherDetails.lastname}</span>
            <span>{online ? 'Online':'Offline'}</span>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
