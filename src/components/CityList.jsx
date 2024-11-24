import PropTypes from "prop-types";
import Loader from "./Loader";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const CityList = () => {
    const { cities, isLoading } = useCities();
    
    return (
        <>
        {isLoading && <Loader/>}
        {!isLoading && !cities.length && <Message message="Add your first city by clicking on a city on the map"/>}
        {!isLoading &&
            <ul className={styles.cityList}>
                {cities.map((city) =>
                    <CityItem
                        key={city.id}
                        city={city}
                    />
                )}
            </ul>
        }
        </>
    );
}

CityList.propTypes = {
    cities: PropTypes.array,
    isLoading: PropTypes.bool
};

export default CityList;