import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL; 

export const connectToDb =async()=>{
    try {
        await mongoose.connect(MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log('mongo Connected')
    } catch (error) {
        console.log('mongo Error',error)
    }
}