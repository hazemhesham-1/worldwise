import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = () => {
    return (
        <Link to="/" className={styles.logoLink}>
            <div className={styles.logo}>
                <img
                    src="/assets/logo.png"
                    alt="worldwise-logo"
                />
                <h3>WorldWise</h3>
            </div>
        </Link>
    );
}

export default Logo;