import { GoogleOAuth } from '../routes/GoogleOAuth';

export default function LoginPage() {

    return (
        <>
            <div>
                <h1>Login Page</h1>
                    
                <button onClick={GoogleOAuth}>Login with Google</button>

            </div>
        </>
        
    )
}