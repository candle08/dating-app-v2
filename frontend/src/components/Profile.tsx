import {getProfile} from '../routes/api'
export const Profile = () => {
    const handleClick = () => {
        const response = getProfile();
    }

    return (
        <>

            <button onClick={handleClick}></button>
        </>
    )
}