import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '../routes/api'

// interfaces for everything
export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}

interface AuthContextType {
    user: User | null,
    loading: boolean,
    setUser: (newUser: User | null) => void,
    login: (username: string, password: string) => Promise<void>,
    signup: (username: string, password: string, firstName: string, lastName: string) => Promise<void>,
    logout: () => void,
}


export interface apiResponse {
    user: User,
    token: string,
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<null | User>(null);
    const [loading, setLoading] = useState<true | false>(true);

    const setUser = (newUser: User | null) => {
        setUserState(newUser);
        
        if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
        else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }

    //check if user already logged in
    useEffect(() => {
        const userState = localStorage.getItem('user');
        if (userState && userState !== "undefined") {
            setUser(JSON.parse(userState));
        }
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>

    // login api call, which sends info to backend database to validate user
    const login = async (username: string, password: string): Promise<void> => {
        const data = {
            username: username,
            password: password
        }
        try {
            const response: apiResponse = await auth(data, 'login');
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.token));
            console.log("user", user);

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
            const response: apiResponse = await auth(data, 'signup');
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.token));

        } catch {
            console.log('signup failed');
        }
    }

    // logout
    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("useAuth undefined");
    return context;
};
