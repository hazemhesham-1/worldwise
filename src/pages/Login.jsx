import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import MainNav from "../components/MainNav";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

function Login() {
    const [email, setEmail] = useState("hazem.hesham@gmail.com");
    const [password, setPassword] = useState("123456");
    const { isAuthenticated, userLogin } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate("/app", { replace: true });
    }, [isAuthenticated, navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        if(email && password) {
            userLogin(email, password);
        }
    }

    return (
        <div className={styles.login}>
            <MainNav/>
            <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label>Email address</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.row}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Button type="primary">Login</Button>
            </form>
        </div>
    );
}

export default Login;