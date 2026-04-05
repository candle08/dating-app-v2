import { type User, type apiResponse } from "../context/AuthContext";
import axios from 'axios';

const backendUrl = 'http://localhost:5120';


export const auth = async (data: any, type: string) => {
    try {
        const response: apiResponse = await axios.post(`${backendUrl}/api/auth/${type}`, data);

        return response;
    } catch {
        console.log(`${type} failed`);
        console.log('data: ', data);
        return;
    }
}