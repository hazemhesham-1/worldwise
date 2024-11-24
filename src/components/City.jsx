import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./City.module.css";
import Loader from "./Loader";
import BackButton from "./BackButton";

function formatDate(date) {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
    };
    return new Date(date).toLocaleDateString("en-US", options);
}

const City = () => {
    const { id } = useParams();
    const { currentCity, getCity, isLoading } = useCities();
    const { cityName, country, imgURL, date, notes } = currentCity;

    useEffect(() => {
        getCity(id);
    }, [id, getCity]);

    return (
        <>
            {isLoading && <Loader/>}
            {!isLoading &&
                <div className={styles.city}>
                    <div className={styles.row}>
                        <h5>City Name</h5>
                        <div className={styles.cityName}>
                            <img src={imgURL} alt={`${country}-flag`}/>
                            <h3>{cityName}</h3>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <h5>You went to {cityName} on</h5>
                        <p>{formatDate(date)}</p>
                    </div>
                    {notes &&
                        <div className={styles.row}>
                            <h5>Your Notes</h5>
                            <p>{notes}</p>
                        </div>
                    }
                    <div className={styles.row}>
                        <h5>Learn More</h5>
                        <a
                            href={`https://en.wikipedia.org/wiki/${cityName}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Check out {cityName} on Wikipedia &rarr;
                        </a>
                    </div>
                    <div>
                        <BackButton/>
                    </div>
                </div>
            }
        </>
    );
}

export default City;