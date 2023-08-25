import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    const user = await UserModel.findOne({ username });

    //user already exist
    if (user) {
      return res.status(200).send({
        message: "User with Username is already Exist",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    //new user
    const newUser = new UserModel({
      username,
      password: hashPassword,
      firstname,
      lastname,
    });

    await newUser.save();

     const token = jwt.sign({
      username:newUser.username,id:newUser._id
     },process.env.JWT_KEY,{expiresIn:'2h'})

    return res.status(200).send({
      success: true,
      message: "New User Created Succesfully",
      newUser,
      token
    });

  } catch (error) {
    return res.status(500).send({
      message: "Error in New User",
    });
 
  }
};

//login

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({username});
    
    if(user){
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(200).send({
          success: false,
          message: "Please login with correct credentials",
        });
      }
  
      const token = jwt.sign({
        username:user.username,id:user._id
       },process.env.JWT_KEY,{expiresIn:'2h'})
  
      return res.status(200).send({
        success: true,
        message: "user login Successfully",
        user,
        token
      });

    }

    else{
      return res.status(200).send({
        success: false,
        message: "Please login with correct credentials",
      });
    }

   
  } catch (error) {
     return res.status(500).send({
      success: false,
      message: "error occured in login",
    });
  }
};
