import axios from "axios";

const baseUrl = "http://localhost:3000/";

const getToken = () => {
    if (localStorage.getItem("token") !== null) {
        return JSON.parse(localStorage.getItem("token"));
    } else {
        return "";
    }
}

export const getPosts = async (pageNo, sortBy, section) => {
    return await axios.get(`${section}`, {headers: {Authorization: `Bearer ${getToken()}`}, params: {pageNo, sortBy}});
}

export const getComments = async (postId) => {
    return await axios.get(`${baseUrl}api/comments/${postId}`);
}

export const getUserData = async (username) => {
    return await axios.get(`${baseUrl}api/user/data/${username}`);
}

export const getLeaderboard = async () => {
    return await axios.get(`${baseUrl}api/leaderboard/top`);
}

export const createComment = async (comment) => {
    await axios.post(`${baseUrl}api/comments/save`, comment, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const deletePost = async (postId) => {
    return await axios.delete(`${baseUrl}api/posts/${postId}`, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const createPost = async (formData) => {
    await axios.post(`${baseUrl}api/posts`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`
        }
    });
}

export const login = async (user) => {
    return await axios.post(`${baseUrl}api/user/login`, user);
}

export const register = async (user) => {
    return await axios.post(`${baseUrl}api/user/register`, user, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const vote = async (vote) => {
    console.log(vote);
    return await axios.post(`${baseUrl}api/vote`, vote, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const health = async () => {
    return await axios.get(`${baseUrl}api/user/health`, {headers: {Authorization: `Bearer ${getToken()}`}})
}

