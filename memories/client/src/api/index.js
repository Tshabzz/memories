import axios from 'axios'
// import dotenv from 'dotenv'

// dotenv.config()

const url = 'http://localhost:8080/api';


export const fetchPosts = () => axios.get(url)
export const createPost = (data) => axios.post(url, data)