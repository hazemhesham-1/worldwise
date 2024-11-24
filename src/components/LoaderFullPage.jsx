import styles from "./LoaderFullPage.module.css";
import Loader from "./Loader";

const LoaderFullPage = () => {
    return (
        <div className={styles.loaderFullPage}>
            <Loader/>
        </div>
    );
}

export default LoaderFullPage;