import axios from 'axios';
import { type SwipeCard } from '../pages/Swiping'
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

export const getProfile = async (userId: number): Promise<SwipeCard | null> => {
    try {
        const response = await axios.get(`${backendUrl}/api/getProfile`, { params: { userId } });
        return response.data;
    } catch (error) {
        console.log('getProfile failed');
        throw (error);
    }
}

export const sendProfile = async (raterId: number, rateeId: number, value: number) => {
    try {
        const response = await axios.post(`${backendUrl}/api/sendProfile`, { raterId, rateeId, value });
        return response.data;
    } catch (error) {
        console.log('send profile failed');
        throw (error);
    }
}

export interface RatedUserView {
    userId: number,
    firstname: string,
    lastname: string,
    img?: string,
    value: number,
    createdAt: string,
}

export interface MatchView {
    userId: number,
    firstname: string,
    lastname: string,
    email: string,
    img?: string,
    value: number,
}

export const getRatingsGiven = async (userId: number): Promise<RatedUserView[]> => {
    const response = await axios.get(`${backendUrl}/api/dashboard/ratings`, { params: { userId } });
    return response.data;
}

export const getMatches = async (userId: number): Promise<MatchView[]> => {
    const response = await axios.get(`${backendUrl}/api/dashboard/matches`, { params: { userId } });
    console.log('email: ', response.data[0].email);
    console.log('firstname: ', response.data[0].firstname);
    return response.data;
}

export interface UserProfileData {
    userId: number,
    preferredFirstname?: string,
    img?: string,
    age?: number,
    ageLowerBound?: number,
    ageUpperBound?: number,
    maxDistance: number,
    typeRelationship?: string,
    kids?: string,
    humor?: string,
    shows?: string,
    books?: string,
    hobbies?: string,
    funNight?: string,
    petPeeve?: string,
}

export const getMyProfile = async (userId: number): Promise<UserProfileData | null> => {
    const response = await axios.get(`${backendUrl}/api/profile`, { params: { userId } });
    return response.data;
}

export const saveMyProfile = async (data: UserProfileData): Promise<UserProfileData> => {
    const response = await axios.post(`${backendUrl}/api/profile`, data);
    return response.data;
}