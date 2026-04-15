
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import s from '../styling.module.scss';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [firstname, setfirstname] = useState<string>('');
    const [lastname, setlastname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const { signup } = useAuth();
    const navigate = useNavigate();

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
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-100 justify-items-center">
                <h1>signup !</h1>
                <h3 className="mb-10">true love awaits</h3>
                <div className="">
                    <form onSubmit={handleSubmit} className="w-80">
                        <input
                            className={s.login}
                            type="text"
                            value={firstname}
                            placeholder="First Name"
                            onChange={(e) => setfirstname(e.target.value)} />
                        <input
                            className={s.login}
                            type="text"
                            value={lastname}
                            placeholder="Last Name"
                            onChange={(e) => setlastname(e.target.value)} />
                        <input
                            className={s.login}
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)} />
                        <input
                            className={s.login}
                            type="text"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className={s.login}>Sign up!!</button>

                    </form>
                    <label>Already have an account? <a className="text-yellow-800 hover:text-yellow-900" onClick={() => navigate('/login')}>Login</a></label>
                </div>
            </div>


        </div >

    </>



}