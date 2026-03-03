import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const GoogleOAuth = () => {
     
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const endpoint = 'endpoint';
    useEffect(() => {
        const apiCall = async() => {
            try {
                console.log('hi');
                const response = await axios.get(endpoint);
                console.log(response.data);
                setLoading(false);
                navigate('/dashboard');

            } catch (error) {
                console.error("unable to log user in", error);
                setLoading(false);

            } 
        }
        apiCall();

    }, [navigate]) // this will only run once
    
    if (loading) { 
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (<div>Failure</div>)
}