import { type User, type apiResponse } from "../context/AuthContext";
import axios from 'axios';

const backendUrl = 'http://localhost:5120';


export const auth = async (data: any, type: string) => {
    try {
        const response = await axios.post(`${backendUrl}/api/auth/${type}`, data);
        return response.data;
    } catch (error) {
        console.log(`${type} failed`);
        console.log('data: ', data);
        throw (error);
    }
}