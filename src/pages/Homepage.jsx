import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import MainNav from "../components/MainNav";

function Homepage() {
    return (
        <main className={styles.homepage}>
            <MainNav/>
            <section>
                <h1>
                    <span>You travel the world</span>
                    <span>WorldWise keeps track of your adventures</span>
                </h1>
                <h2>
                    A world map that tracks your footsteps into every city
                    you can think of. Never forget your wonderful
                    experiences, and show your friends how you have
                    wandered the world.
                </h2>
                <Link to="/login" className="btn">
                    Start tracking now
                </Link>
            </section>
        </main>
    );
}

export default Homepage;