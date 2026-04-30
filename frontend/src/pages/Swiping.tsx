import { Header } from '../components/Header'
import {Profile} from '../components/Profile'
import {useState, useEffect} from 'react';
import {getProfile} from '../routes/api'

export interface Profile {
    data: any,
} 

export const SwipingPage = () => {
    const [profile, setProfile] = useState<any | null>(null);
    const [firstName, setFirstName] = useState<string>('');
    const [img, setImg] = useState<string>('');


    const handleClick = () => {
        const response = getProfile();
        setProfile(response);
    }

    const DatingProfile = () => {
        useEffect(() => {
            setFirstName(profile.firstName);
            setImg(profile.Img);
        }, [profile]);

        return (
            <>
                <div>
                    <h1>{firstName}</h1>
                    <img src={img}/>
                </div>
            </>
        )
    }

    return (
        <div>
            <Header />
            <h1>Swiping</h1>

            <DatingProfile />

            <button onClick={handleClick}>next profile</button>
        </div>
    )
}