import { Header } from '../components/Header'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
export const Profile = () => {
    const { user } = useAuth();

    const [firstname, setFirstname] = useState<string>(user?.firstname || '');
    const [distance, setDistance] = useState<number>(50);
    const [age, setAge] = useState<number>();
    const [kids, setKids] = useState<string>('');
    const [typeRelationship, setTypeRelationship] = useState<string>('');
    const [humor, setHumor] = useState<Array<string>>('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // api call to backend to save profile
        } catch {
            console.log('unable to save profile');
        }

    }
    return <>
        <div>
            <Header />
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>core values</h3>
                    <label>preferred firstname</label>
                    <input
                        type="text"
                        value={firstname}
                        placeholder={user?.firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />

                    <label>age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />

                    <label>type of relationship</label>
                    <input
                        type="radio"
                        value="casual"
                        onChange={(e) => setTypeRelationship(e.target.value)}
                    />

                    <label>maximum distance</label>
                    <input
                        type="range"
                        value={distance}
                        min="10"
                        max="6000"
                        step="10"
                        onChange={(e) => setDistance(Number(e.target.value))}
                    />
                    <label>{distance} " km"</label>

                    <label>kids?</label>
                    <input

                    />



                </div>
                <div>
                    <h3>interests & vibes</h3>

                    <label>Favorite TV show(s)?</label>
                </div>

                <button type="submit">save</button>

            </form>

        </div>
    </>
}