import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="w-100">
            <button onClick={() => {navigate('/Swiping')}}>
                swipe
            </button>
            <button onClick={() => {navigate('/Dashboard')}}>matches</button>
            <button onClick={() => { navigate('/Profile') }}>
                edit profile
            </button>
            <button onClick={logout}>
                logout
            </button>
        </div>
    )
}