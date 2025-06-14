import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <footer>
                <p>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
}

export default Sidebar;