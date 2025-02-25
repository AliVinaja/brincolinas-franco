import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const getUserCart = async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}/cart`);
    return response.data;
};

export const register = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
};

