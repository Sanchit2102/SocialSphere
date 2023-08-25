import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "./user.js";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../../api/UserRequest";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const user = useSelector(
    (state) =>
      state.authReducer.authData?.user || state.authReducer.authData?.newUser
  );

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
    };
    fetchPersons();
  }, []);



  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.length > 0 && (
        <>
          {persons.map((person) => {
            if (person._id !== user._id) {
              return <User person={person} key={person._id} />;
            }
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default FollowersCard;
