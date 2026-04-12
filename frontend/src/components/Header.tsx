import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styling.module.css';

export const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="w-100 flex justify-between mb-10 mt-5">
            <button onClick={() => { navigate('/Swiping') }}>
                swipe
            </button>
            <button onClick={() => { navigate('/Dashboard') }}>matches</button>
            <button onClick={() => { navigate('/Profile') }}>
                profile
            </button>
            <button onClick={logout}>
                logout
            </button>
        </div>
    )
}