import { Header } from '../components/Header'
import { useState, useEffect } from 'react';
import { getProfile, sendProfile } from '../routes/api'
import { useAuth } from '../context/AuthContext'

export interface SwipeCard {
    userId: number,
    firstName: string,
    img: string
}

const ratingOptions: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const SwipingPage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<SwipeCard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const loadNextProfile = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const next = await getProfile(user.id);
            setProfile(next);
        } catch {
            console.log('failed to load next profile');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadNextProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!user || !profile) return;
        const value = Number(e.currentTarget.value);
        try {
            await sendProfile(user.id, profile.userId, value);
        } catch {
            console.log('failed to send rating');
        }
        await loadNextProfile();
    }

    return (
        <div>
            <Header />
            <h1>Swiping</h1>

            {loading && <p>Loading...</p>}

            {!loading && !profile && <p>No more profiles to rate right now!</p>}

            {!loading && profile && (
                <>
                    <div>
                        <h2>{profile.firstName}</h2>
                        {profile.img && <img src={profile.img} alt={profile.firstName} />}
                    </div>

                    <div>
                        {ratingOptions.map((option) => (
                            <button key={option} onClick={handleClick} value={option}>{option}</button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
