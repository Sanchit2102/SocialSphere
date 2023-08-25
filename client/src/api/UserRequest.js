import axios from 'axios'
const API = axios.create({baseURL:'http://localhost:3001'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req; 
  });

export const getUser =(userId)=>API.get(`/user/${userId}`)
export const updateUser = (id, formData) =>  API.put(`/user/${id}`, formData)
export const getAllUsers = () =>  API.get('/user/all/')
export const followUser = (id,fid) =>  API.put(`/user/follow/${id}`,fid)
export const unfollowUser = (id,fid) =>  API.put(`/user/unfollow/${id}`,fid)