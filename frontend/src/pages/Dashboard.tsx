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
            <div className="flex flex-col items-center px-4 pb-10">
                <Header />
                <h1 className="text-3xl mb-6">Dashboard</h1>

                {loading && <p>Loading...</p>}

                {!loading && (
                    <div className="w-full max-w-xl flex flex-col gap-6">
                        <section className="bg-slate-800 rounded-md p-4">
                            <h2 className="text-xl mb-3 text-pink-400">Your matches</h2>
                            {matches.length === 0 && <p className="text-slate-400">no matches :(</p>}
                            <ul className="flex flex-col gap-2">
                                {matches.map((match) => (
                                    <li key={match.userId} className="flex justify-between items-center bg-slate-900 rounded-md px-3 py-2">
                                        <span className="flex items-center gap-3">
                                            {match.img
                                                ? <img src={match.img} alt={match.firstname} className="w-10 h-10 rounded-full object-cover" />
                                                : <span className="w-10 h-10 rounded-full bg-slate-700" />}
                                            {match.firstname} {match.lastname}
                                        </span>
                                        <span className="text-sm text-pink-400">you both rated {match.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-slate-800 rounded-md p-4">
                            <h2 className="text-xl mb-3 text-blue-300">Everyone you've ranked</h2>
                            {ratings.length === 0 && <p className="text-slate-400">no rankings yet.</p>}
                            <ul className="flex flex-col gap-2">
                                {ratings.map((rating) => (
                                    <li key={rating.userId} className="flex justify-between items-center bg-slate-900 rounded-md px-3 py-2">
                                        <span className="flex items-center gap-3">
                                            {rating.img
                                                ? <img src={rating.img} alt={rating.firstname} className="w-10 h-10 rounded-full object-cover" />
                                                : <span className="w-10 h-10 rounded-full bg-slate-700" />}
                                            {rating.firstname} {rating.lastname}
                                        </span>
                                        <span className="text-sm text-blue-300">you rated them a {rating.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                )}
            </div>
        </>
    )
}
