import PropTypes from "prop-types";
import Loader from "./Loader";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
    const { cities, isLoading } = useCities();
    
    if(isLoading) return <Loader/>;
    if(!cities.length) {
        return (
            <Message
                message="Add your first country by clicking on a city on the map"
            />
        );
    }

    const countries = cities.reduce((arr, city) => {
        if(!arr.map(el => el.countryName).includes(city.country)) {
            return [...arr, {countryName: city.country, imgURL: city.imgURL}];
        }
        return arr;
    }, []);

    return (
        <>
        {!isLoading &&
            <ul className={styles.countryList}>
                {countries.map((country) =>
                    <CountryItem
                        key={country.countryName}
                        country={country.countryName}
                        imgURL={country.imgURL}
                    />
                )}
            </ul>
        }
        </>
    );
}

CountryList.propTypes = {
    cities: PropTypes.array,
    isLoading: PropTypes.bool
};

export default CountryList;