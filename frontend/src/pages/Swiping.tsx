import { Header } from '../components/Header'
import {useState, useEffect} from 'react';
import {getProfile, sendProfile} from '../routes/api'

export interface Profile {
    data: any,
} 

export const SwipingPage = () => {
    const [profile, setProfile] = useState<any | null>(null);
    const [firstName, setFirstName] = useState<string>('');
    const [img, setImg] = useState<string>('');

    const rating: Array<number> = [1, 2, 3, 4, 5];


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        const data = {
            profile,
            value,
        }
        sendProfile(data); // sending profile and ranking to backend

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

            {rating.map((option) => (
                <div>
                    <button onClick={handleClick} value={option}>{option}</button>
                </div>
            )
            )}
        </div>
    )
}