import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            await login(username, password);
        } catch {
            console.log('login failed');
        }
    }

    return (
        <>
            <div>
                <h1>the-cursed-dating-app-v2</h1>
                <h3>come find true love</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)} />
                    <input type="text"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                    <button onClick={() => (navigate('/SignUp'))}>sign up</button>
                </form>
            </div>
        </>

    );
}