import PropTypes from "prop-types";
import styles from "./CountryItem.module.css"

const CountryItem = ({ country, imgURL }) => {
    return (
        <li className={styles.countryItem}>
            <img src={imgURL} alt={`${country}-flag`}/>
            <h3>{country}</h3>
        </li>
    );
}

CountryItem.propTypes = {
    country: PropTypes.string,
    imgURL: PropTypes.string
};

export default CountryItem;