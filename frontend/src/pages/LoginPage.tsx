import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
    //const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>the-cursed-dating-app-v2</h1>
                <h3>come find true love</h3>
                    
                <button onClick={() => {window.location.href=""}}>Login with Google</button>

            </div>
        </>
        
    );
}