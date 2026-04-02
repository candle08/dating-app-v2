import { useAuth, type User } from "../components/AuthContext";
import { useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:5120';

interface apiResponse {
    user: User,
    token: string,
}

export const auth = async (data: any, type: string) => {

    try {
        const response: apiResponse = await axios.post(`${backendUrl}/api/auth/${type}`, data);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', JSON.stringify(response.token));
    } catch {
        console.log(`${type} failed`);
    }
}