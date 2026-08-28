import { Header } from '../components/Header'
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'
import { getRatingsGiven, getMatches, type RatedUserView, type MatchView } from '../routes/api'

export const Dashboard = () => {
    const { user } = useAuth();
    const [ratings, setRatings] = useState<RatedUserView[]>([]);
    const [matches, setMatches] = useState<MatchView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        Promise.all([getRatingsGiven(user.id), getMatches(user.id)])
            .then(([ratingsData, matchesData]) => {
                setRatings(ratingsData);
                setMatches(matchesData);
            })
            .catch(() => console.log('failed to load dashboard'))
            .finally(() => setLoading(false));
    }, [user]);

    return (
        <>
            <div>
                <Header />
                <h1>Dashboard</h1>

                {loading && <p>Loading...</p>}

                {!loading && (
                    <>
                        <section>
                            <h2>Your matches</h2>
                            {matches.length === 0 && <p>No matches yet - keep swiping!</p>}
                            <ul>
                                {matches.map((match) => (
                                    <li key={match.userId}>
                                        {match.firstname} {match.lastname} - you both rated {match.value}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2>Everyone you've ranked</h2>
                            {ratings.length === 0 && <p>You haven't ranked anyone yet.</p>}
                            <ul>
                                {ratings.map((rating) => (
                                    <li key={rating.userId}>
                                        {rating.firstname} {rating.lastname} - you rated them {rating.value}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </>
                )}
            </div>
        </>
    )
}
