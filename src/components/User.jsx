import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

const User = () => {
    const { user, userLogout } = useAuth();

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt="profile-pic"/>
            <span>Welcome, {user.name}</span>
            <button onClick={userLogout}>Logout</button>
        </div>
    );
}

export default User;