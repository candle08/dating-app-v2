import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import axios from 'axios';

// interfaces for everything
interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}

interface AuthContextType {
    user: User | null,
    login: (username: string, password: string) => Promise<void>,
    signup: (username: string, password: string, firstName: string, lastName: string) => Promise<void>,
    logout: () => void,
}

interface apiResponse {
    user: User,
    token: string,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<null | User>(null);
    const [loading, setLoading] = useState<true | false>(true);
    const backendUrl = 'http://localhost:8080';

    // check if user already logged in
    useEffect(() => {
        const userState = localStorage.getItem('user');
        if (userState) {
            setUser(JSON.parse(userState));
        }
        setLoading(false);
    }, []);

    // login api call, which sends info to backend database to validate user

    const login = async (username: string, password: string): Promise<void> => {
        console.log('hi');
        const data = {
            username: username,
            password: password
        }
        try {

            const response: apiResponse = await axios.post('', data);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.token));
        } catch {
            console.log('login failed');
        }
    }

    // sign up api call, sends info to backend db to create user
    const signup = async (username: string, password: string, firstName: string, lastName: string): Promise<void> => {
        const data = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
        }

        try {
            const response: apiResponse = await axios.post('', data);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.token));

        } catch {
            console.log('womp womp');
        }

    }

    // logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("useAuth undefined");
    return context;
};
