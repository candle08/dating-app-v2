import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const GoogleOAuth = () => {
     
    const [loading, setLoading] = useState<Boolean>(true);
    const navigate = useNavigate();
    const endpoint = 'endpoint';
    useEffect(() => {
        const apiCall = async() => {
            try {
                const response = await axios.get(endpoint);
                setLoading(true);
                navigate('/Dashbaord');

            } catch (error) {
                console.error("unable to log user in", error);
            } 
        }
        apiCall();

    }), [navigate] // this will only run once
    
    if (loading) { 
        return (
            <div>
                Loading...
            </div>
        )
    }
    setLoading(false);
}