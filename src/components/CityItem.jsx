import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function formatDate(date) {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    return new Date(date).toLocaleDateString("en-US", options);
}

const CityItem = ({ city }) => {
    const { cityName, country, imgURL, date, position, id } = city;
    const { currentCity, deleteCity } = useCities();
    const isSelected = currentCity.id === id;

    function handleDelete(e) {
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${isSelected ? styles.selected : ""}`}
                to={`${city.id}?lat=${position.lat}&long=${position.long}`}
            >
                <img src={imgURL} alt={`${country}-flag`}/>
                <h3>{cityName}</h3>
                <time>{formatDate(date)}</time>
                <button
                    className={styles.removeBtn}
                    onClick={handleDelete}
                >
                    &times;
                </button>
            </Link>
        </li>
    );
}

CityItem.propTypes = {
    city: PropTypes.object
};

export default CityItem;