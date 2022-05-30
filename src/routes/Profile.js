import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({userObj}) => {

    const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);

    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/", true);
    }

    const onChange = (event) => {
        const {
            target : {value},
        } = event;

        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName : newDisplayName});
        }
    };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName}/>
            <input type="submit" value="Update Profile"/>
        </form>
        
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}

export default Profile;