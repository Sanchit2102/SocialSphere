import axios from 'axios'
const API = axios.create({baseURL:'http://localhost:3001'})

export const getTimelinePosts = (id)=> API.get(`/post/timeline/${id}`)
export const likePost =(id,userId)=> API.put(`/post/like/${id}`,{userId:userId})