import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import s from '../styling.module.css';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch {
            console.log('login failed');
        }
    }

    if (user) navigate('/Dashboard');


    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-100 justify-items-center">
                    <h1>the-cursed-dating-app-v2</h1>
                    <h3 className="mb-10">come find true love</h3>
                    <div className="justify-items-center">
                        <form onSubmit={handleSubmit} className="w-80">
                            <input
                                className={s.login}
                                type="text"
                                value={username}
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)} />
                            <input
                                className={s.login}
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" className={s.login}>Login</button>
                            <button className={s.login}
                                onClick={() => (navigate('/SignUp'))}>sign up</button>
                        </form>
                    </div>
                </div>


            </div>
        </>

    );
}