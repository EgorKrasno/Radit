import {useParams} from "react-router-dom";

const UserPage = () => {
    const {username} = useParams();
    return (
        <div>
            <p>User Page is here wow</p>
            <p>{username}</p>
        </div>
    );
}

export default UserPage;