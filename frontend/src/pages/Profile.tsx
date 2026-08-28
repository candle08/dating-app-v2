import { Header } from '../components/Header'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyProfile, saveMyProfile, type UserProfileData } from '../routes/api'
import s from '../styling.module.scss';

export const Profile = () => {
    const { user } = useAuth();

    // core values
    const [firstname, setFirstname] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [distance, setDistance] = useState<number>(50);
    const [age, setAge] = useState<number | ''>('');
    const [kids, setKids] = useState<string>('');
    const [typeRelationship, setTypeRelationship] = useState<string>('');
    const [ageLowerBound, setAgeLowerBound] = useState<number | ''>('');
    const [ageUpperBound, setAgeUpperBound] = useState<number | ''>('');

    const kidsOptions: Array<string> = ['no kids', 'kids', 'unsure', 'no preference'];
    const relationshipOptions: Array<string> = ['casual', 'casual open to serious', 'serious', 'serious with timeline for marriage'];

    // personality & vibes
    const [shows, setShows] = useState<string>('');
    const [books, setBooks] = useState<string>('');

    useEffect(() => {
        if (!user) return;
        setFirstname(user.firstname);
        getMyProfile(user.id).then((profile) => {
            if (!profile) return;
            setFirstname(profile.preferredFirstname || user.firstname);
            setImg(profile.img || '');
            setDistance(profile.maxDistance || 50);
            setAge(profile.age ?? '');
            setAgeLowerBound(profile.ageLowerBound ?? '');
            setAgeUpperBound(profile.ageUpperBound ?? '');
            setKids(profile.kids || '');
            setTypeRelationship(profile.typeRelationship || '');
            setShows(profile.shows || '');
            setBooks(profile.books || '');
        }).catch(() => console.log('failed to load profile'));
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const data: UserProfileData = {
            userId: user.id,
            preferredFirstname: firstname,
            img,
            age: age === '' ? undefined : age,
            ageLowerBound: ageLowerBound === '' ? undefined : ageLowerBound,
            ageUpperBound: ageUpperBound === '' ? undefined : ageUpperBound,
            maxDistance: distance,
            typeRelationship,
            kids,
            shows,
            books,
        }

        try {
            await saveMyProfile(data);
        } catch {
            console.log('unable to save profile');
        }
    }

    return <>
        <div className="justify-items-center">
            <Header />
            <div className="bg-slate-800 justify-items-center w-100 rounded-md p-4">
                <h1 className="text-3xl">Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>core values</h3>
                        <div className={s.profile}>
                            <label>preferred firstname</label>
                            <input
                                type="text"
                                value={firstname}
                                placeholder={user?.firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>

                        <div className={s.profile}>
                            <label>profile photo url</label>
                            <input
                                type="text"
                                value={img}
                                placeholder="https://..."
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </div>

                        <div className={s.profile}>
                            <label>age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.valueAsNumber || '')}
                            />
                        </div>

                        <div className={s.profile}>

                            <label>age boundaries</label>
                            <input
                                type="number"
                                value={ageLowerBound}
                                min="18"
                                onChange={(e) => setAgeLowerBound(e.target.valueAsNumber || '')}
                            />
                            <label>lower bound</label>
                            <input
                                type="number"
                                value={ageUpperBound}
                                max="150"
                                onChange={(e) => setAgeUpperBound(e.target.valueAsNumber || '')}
                            />
                            <label>upper bound</label>
                        </div>


                        <div className={s.profile}>
                            <label>type of relationship</label>
                            {relationshipOptions.map((option) => (
                                <div key={option}>
                                    <input
                                        type="radio"
                                        name="relationshipOption"
                                        value={option}
                                        checked={typeRelationship === option}
                                        onChange={(e) => setTypeRelationship(e.target.value)}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>


                        <div className={s.profile}>
                            <label>maximum distance</label>
                            <input
                                type="range"
                                value={distance}
                                min="10"
                                max="3000"
                                step="10"
                                onChange={(e) => setDistance(e.target.valueAsNumber)}
                            />
                            <label>{distance} km</label>
                        </div>

                        <div className={s.profile}>
                            <label>kids?</label>
                            {
                                kidsOptions.map((option) => (
                                    <div key={option}>
                                        <input
                                            type="radio"
                                            name="kidOption"
                                            value={option}
                                            checked={kids === option}
                                            onChange={(e) => setKids(e.target.value)}
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div>
                        <h3>interests & vibes</h3>
                        <div>
                            <label>tv shows?</label>
                            <input
                                placeholder="press enter for each show"
                                value={shows}
                                type="text"
                                onChange={(e) => setShows(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>books?</label>

                            <input
                                placeholder="press enter for each book"
                                value={books}
                                type="text"
                                onChange={(e) => setBooks(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit">save</button>

                </form>
            </div>
        </div>
    </>
}
