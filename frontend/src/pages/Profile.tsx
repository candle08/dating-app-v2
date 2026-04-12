import { Header } from '../components/Header'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
export const Profile = () => {
    const { user } = useAuth();

    // core values
    const [firstname, setFirstname] = useState<string>(user?.firstname || '');
    const [distance, setDistance] = useState<number>(50);
    const [age, setAge] = useState<number>();
    const [kids, setKids] = useState<string>('');
    const [typeRelationship, setTypeRelationship] = useState<string>('');
    const [humor, setHumor] = useState<Array<string>>([]);
    const [ageLowerBound, setAgeLowerBound] = useState<number>();
    const [ageUpperBound, setAgeUpperBound] = useState<number>();

    const humorOptions: Array<string> = ['sarcasm', 'dark', 'dad jokes & puns', 'memes']
    const kidsOptions: Array<string> = ['no kids', 'kids', 'unsure', 'no preference'];
    const relationshipOptions: Array<string> = ['casual', 'casual open to serious', 'serious', 'serious with timeline for marriage'];

    // personality & vibes
    const [movies, setMoves] = useState<Array<string>>([]);
    const [books, setBooks] = useState<Array<string>>([]);
    const [hobbies, setHobbies] = useState<Array<string>>([]);
    const [funNight, setFunNight] = useState<string>('');
    const [petPeeve, setPetPeeve] = useState<string>('');

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
                        onChange={(e) => setAge(e.target.valueAsNumber)}
                    />

                    <label>age boundaries</label>
                    <input
                        type="number"
                        value={ageLowerBound}
                        min="18"
                        onChange={(e) => setAgeLowerBound(e.target.valueAsNumber)}
                    />
                    <label>lower bound</label>
                    <input
                        type="number"
                        value={ageUpperBound}
                        max="150"
                        onChange={(e) => setAgeUpperBound(e.target.valueAsNumber)}
                    />
                    <label>upper bound</label>

                    <label>type of relationship</label>
                    {relationshipOptions.map((option) => (
                        <input
                            type="radio"
                            name="relationshipOption"
                            value={option}
                            onChange={(e) => setTypeRelationship(e.target.value)}
                        />
                    ))}


                    <label>maximum distance</label>
                    <input
                        type="range"
                        value={distance}
                        min="10"
                        max="6000"
                        step="10"
                        onChange={(e) => setDistance(e.target.valueAsNumber)}
                    />
                    <label>{distance} " km"</label>

                    <label>kids?</label>
                    {
                        kidsOptions.map((option) => (
                            <input
                                type="radio"
                                name="kidOption"
                                value={option}
                                onChange={(e) => setKids(e.target.value)}
                            />
                        ))

                    }




                </div>
                <div>
                    <h3>interests & vibes</h3>

                    <label>tv shows?</label>
                    <p>press enter for each show</p>

                    <label>books?</label>
                    <p>press enter for each book</p>
                </div>

                <button type="submit">save</button>

            </form>

        </div>
    </>
}