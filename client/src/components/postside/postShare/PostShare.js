import React, { useState, useRef } from "react";
import Profile from "../../../img/profileImg.png";
import "./PostShare.css";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../../action/uploadAction";

const PostShare = () => {

  const serverPublic =process.env.REACT_APP_PUBLIC_FOLDER
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const loading = useSelector((state)=>state.postReducer.uploading)
  const user = useSelector(
    (state) =>
      state.authReducer.authData?.user || state.authReducer.authData?.newUser
  );

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if(image){
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name',filename)
      data.append('file',image)
      newPost.image = filename;
      console.log(newPost)
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  };
const reset =()=>{
  setImage(null)
  desc.current.value=''

}
  return (
    <>
      <div className="PostShare">
      <img src={user.profilePicture? serverPublic+user.profilePicture:Profile} alt="cover" style={{background:"var(--buttonBg)"}}/>
        <div>
          <input
            type="text"
            placeholder="what's happening"
            ref={desc}
            required
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => {
                imageRef.current.click();
              }}
            >
              <UilScenery />
              Photo
            </div>
            <div className="option" style={{ color: "var(--video)" }}>
              <UilPlayCircle />
              Video
            </div>
            <div className="option" style={{ color: "var(--location)" }}>
              <UilLocationPoint />
              Location
            </div>
            <div className="option" style={{ color: "var(--schedule)" }}>
              <UilSchedule />
              Schedule
            </div>
            <button className="button ps-btn" onClick={handleSubmit} disabled={loading}> 
            {loading ?"Uploading..." :"Share"}
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
          {image && (
            <>
              <div className="prevImage">
                <UilTimes
                  onClick={() => {
                    setImage(null);
                  }}
                />
                <img src={URL.createObjectURL(image)} alt="img" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostShare;
