import axios from "axios";

const getToken = () => {
    if (localStorage.getItem("token") !== null) {
        return JSON.parse(localStorage.getItem("token"));
    } else {
        return "";
    }
}

export const getPosts = async (pageNo) => {
    return await axios.get(`api/posts/all?pageNo=${pageNo}`, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const getComments = async (postId) => {
    return await axios.get(`api/comments/${postId}`, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const createComment = async (comment) => {
    await axios.post('api/comments/save', comment, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const createPost = async (formData) => {
    await axios.post('api/posts/save', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`
        }
    });
}

export const login = async (user) => {
    return await axios.post('api/user/login', user);
}

export const register = async (user) => {
    return await axios.post('api/user/register', user, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const vote = async (vote) => {
    console.log(vote);
    return await axios.post('api/vote', vote, {headers: {Authorization: `Bearer ${getToken()}`}});
}

export const health = async () => {
    return await axios.get('api/user/health', {headers: {Authorization: `Bearer ${getToken()}`}})
}

