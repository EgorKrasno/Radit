import axios from "axios";

const secret = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJhdWQiLCJzdWIiOiJhZG1pbiIsImlzcyI6IlJEIiwiZXhwIjoxNjMyNjgwNDY1LCJpYXQiOjE2MzIyNDg0NjUsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfU1VQRVJfQURNSU4iXX0.34ig04jUU8-CGQif-mH9-0Iuf6w-RAUO2L-Si_HkicnxcU5xtFrt4dEXn3NITtoijGzlLU9_WObRC2TI9Zr6dw';
const headers = {
    'Authorization': `Bearer ${secret}`
};

export const getPosts = async () => {
    return await axios.get('api/posts/all', {headers});
}

export const createPost = async (post) => {
    await axios.post('api/posts/save', post, {headers});
}

export const login = async (user) => {
    return await axios.post('api/user/login', user);
}

export const register = async (user) => {
    return await axios.post('api/user/register', {headers}, user);
}

