import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styling.module.scss';

export const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="max-w-xl w-full mx-auto flex justify-between mb-10 mt-5 px-4">
            <button onClick={() => { navigate('/swiping') }}>
                swipe
            </button>
            <button onClick={() => { navigate('/dashboard') }}>dashboard</button>
            <button onClick={() => { navigate('/profile') }}>
                profile
            </button>
            <button onClick={logout}>
                logout
            </button>
        </div>
    )
}