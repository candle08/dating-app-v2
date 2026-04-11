
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const SignUp = () => {
    const [firstname, setfirstname] = useState<string>('');
    const [lastname, setlastname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const { signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        console.log('hi');
        e.preventDefault();
        try {
            await (signup(username, password, firstname, lastname))
        } catch {
            console.log('womp womp');
        }
    }
    return <>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={firstname}
                placeholder="First Name"
                onChange={(e) => setfirstname(e.target.value)} />
            <input
                type="text"
                value={lastname}
                placeholder="Last Name"
                onChange={(e) => setlastname(e.target.value)} />
            <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)} />
            <input
                type="text"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign up!!</button>

        </form>
    </>



}