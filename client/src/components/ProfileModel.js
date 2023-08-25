import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import "../pages/auth/Auth.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../action/uploadAction.js";
import { updateUser } from "../action/UserAction.js";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const [opened] = useDisclosure(false);
  const theme = useMantineTheme();
  const { password, ...others } = data;
  const [formData, setFormData] = useState(others);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      if (e.target.name === "profilePicture") {
        setProfilePicture(img);
      } else {
        setCoverPicture(img);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = formData;

    if (profilePicture) {
      const profileFormData = new FormData();
      const profileFilename = Date.now() + profilePicture.name;
      profileFormData.append("name", profileFilename);
      profileFormData.append("file", profilePicture);
      userData.profilePicture = profileFilename;

      try {
        await dispatch(uploadImage(profileFormData)); // Assuming uploadImage is an async action
      } catch (error) {
        console.log("Error uploading profile picture:", error);
      }
    }

    if (coverPicture) {
      const coverFormData = new FormData();
      const coverFilename = Date.now() + coverPicture.name;
      coverFormData.append("name", coverFilename);
      coverFormData.append("file", coverPicture);
      userData.coverPicture = coverFilename;

      try {
        await dispatch(uploadImage(coverFormData)); 
      } catch (error) {
        console.log("Error uploading cover picture:", error);
      }
    }
console.log(userData)

    try {
      await dispatch(updateUser(params.id, userData)); 
      setModalOpened(false);
      
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  
  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
        }}
        // title="Authentication"
        overlayprops={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        size="55%"
      >
        <form className="infoForm" onSubmit={handleSubmit} style={{width:'45rem'}}>
          <h3>Your Info</h3>
          <div>
            <input
              type="text"
              className="infoInput"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstname}
            />
            <input
              type="text"
              className="infoInput"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastname}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="worksAt"
              placeholder="Works at"
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="livesin"
              placeholder="lives in"
              onChange={handleChange}
              value={formData.livesin}
            />
            <input
              type="text"
              className="infoInput"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              value={formData.country}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="relationship"
              placeholder="Relationship status"
              onChange={handleChange}
              value={formData.relationship}
            />
          </div>
          <div>
            Profile Image
            <input
              type="file"
              name="profilePicture"
              onChange={ImageChange}
            />
            Cover Image
            <input
              type="file"
              name="coverPicture"
              onChange={ImageChange}
            />
          </div>
          <button className="button info-btn" >
            Update
          </button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;
