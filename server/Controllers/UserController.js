import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get all user
export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};



// get user from database
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(200).send({
        success: true,
        message: "User does not exist",
      });
    }

    const { password, ...otherDetails } = user._doc;

    return res.status(200).send({
      success: true,
      otherDetails,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get user",
      error,
    });
  }
};

//update user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;
  if (id === _id) {
    try {
      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "2h" }
      );

      return res.status(200).send({user,token});
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.status(403).send("Access Denied");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const { currentUser, currentAdminStatus } = req.body;

    if (id === currentUser || currentAdminStatus) {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).send("User deleted succesfully");
    } else {
      return res.status(403).send("Access Denied");
    }
  } catch (error) {
    return res.status(500).send("Error in Delete user");
  }
};

//follow a user

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};

// Unfollow a User

export const unfollowUser = async (req, res) => {
  const id = req.params.id; //gets unfollowed
  const { _id } = req.body; //unfollowing

  if(_id === id)
  {
    res.status(403).json("Action Forbidden")
  }
  else{
    try {
      const unFollowUser = await UserModel.findById(id)
      const unFollowingUser = await UserModel.findById(_id)


      if (unFollowUser.followers.includes(_id))
      {
        await unFollowUser.updateOne({$pull : {followers: _id}})
        await unFollowingUser.updateOne({$pull : {following: id}})
        res.status(200).json("Unfollowed Successfully!")
      }
      else{
        res.status(403).json("You are not following this User")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
};
