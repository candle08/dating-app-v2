
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';

export const SignUp = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const { signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        console.log('hi');
        e.preventDefault();
        try {
            await (signup(username, password, firstName, lastName))
        } catch {
            console.log('womp womp');
        }
    }
    return <>
        <form onSubmit={handleSubmit}>
            <label>first name</label>
            <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)} />
            <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)} />
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