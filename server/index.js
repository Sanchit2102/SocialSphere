import express from 'express';
import cors from 'cors';
import { connectToDb } from './db.js';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'

const app = express();

//to surf images for public
app.use(express.static('public'))
app.use('/images',express.static('images'))

//middleware
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors());

//route
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)

//mongo
connectToDb();
const PORT = process.env.PORT 

app.listen(PORT || 3002,()=>{
    console.log(`server is running on ${PORT}`)
})
