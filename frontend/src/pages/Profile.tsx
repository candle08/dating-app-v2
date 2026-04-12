import { Header } from '../components/Header'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import s from '../styling.module.css';

export const Profile = () => {
    const { user } = useAuth();

    const isMobile = false;

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
    const [show, setShow] = useState<Array<string>>([]);
    const [books, setBooks] = useState<Array<string>>([]);
    const [hobbies, setHobbies] = useState<Array<string>>([]);
    const [funNight, setFunNight] = useState<string>('');
    const [petPeeve, setPetPeeve] = useState<string>('');

    const wrapperSetArray = (input: string, setFunction: any) => {
        setFunction((prev: Array<string>) => {
            if (prev.includes(input)) {
                return prev.filter((hobby) => hobby !== input)
            } else {
                return [...prev, input]
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // api call to backend to save profile
        } catch {
            console.log('unable to save profile');
        }

    }

    return <>
        <div className="justify-items-center">
            <Header />
            <div className="bg-slate-900 justify-items-center w-100 rounded-md p-4">
                <h1>Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>core values</h3>
                        <div >
                            <label>preferred firstname</label>
                            <input
                                type="text"
                                value={firstname}
                                placeholder={user?.firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.valueAsNumber)}
                            />
                        </div>

                        <div>

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
                        </div>


                        <div>
                            <label>type of relationship</label>
                            {relationshipOptions.map((option) => (
                                <div>
                                    <input
                                        type="radio"
                                        name="relationshipOption"
                                        value={option}
                                        onChange={(e) => setTypeRelationship(e.target.value)}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>


                        <div>
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

                        <div>
                            <label>kids?</label>
                            {
                                kidsOptions.map((option) => (
                                    <div>
                                        <input
                                            type="radio"
                                            name="kidOption"
                                            value={option}
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

                        <label>tv shows?</label>


                        <input
                            placeholder="press enter for each show"
                            value={show}
                            type="text"
                        />

                        <label>books?</label>

                    </div>

                    <button type="submit">save</button>

                </form>
            </div>


        </div>
    </>
}