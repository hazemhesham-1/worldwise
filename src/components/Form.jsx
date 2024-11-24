import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Loader from "./Loader";
import Message from "./Message";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const currentDate = new Date().toISOString().slice(0, 16);

const Form = () => {
    const [lat, long] = useUrlPosition();
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const { createCity, isLoading } = useCities();
    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [flagURL, setFlagURL] = useState("");
    const [date, setDate] = useState(currentDate);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if(!lat && !long) return;

        async function fetchCityData() {
            try {
                setIsFormLoading(true);
                setError("");
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${long}`);
                if(!res.ok) throw new Error("Failed to fetch city data");
                const json = await res.json();

                if(!json.countryCode) {
                    throw new Error("This does not seem to be a city. Click somewhere else 🤔");
                }
                
                setCity(json.city);
                setCountry(json.countryName);
                setFlagURL(`https://flagsapi.com/${json.countryCode}/shiny/64.png`);
            }
            catch(err) {
                setError(err.message);
            }
            finally {
                setIsFormLoading(false);
            }
        }

        fetchCityData();
    }, [lat, long]);

    if(!lat && !long) {
        return <Message message="Start by clicking somewhere on the map"/>;
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        if(!city || !date) return;

        const newCity = {
            cityName: city,
            country,
            imgURL: flagURL,
            date,
            notes,
            position: { lat, long }
        }

        await createCity(newCity);
        navigate("/app/cities");
    }

    return (
        <>
        {isFormLoading && <Loader/>}
        {!isFormLoading && error && <Message message={error}/>}
        {!isFormLoading && !error &&
            <form
                className={`${styles.form} ${isLoading ? styles.loading: ''}`}
                onSubmit={handleSubmit}
            >
                <div className={styles.row}>
                    <label htmlFor="city">City name</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <img src={flagURL} alt={`${country}-flag`}/>
                </div>
                <div className={styles.row}>
                    <label htmlFor="date">When did you go to ?</label>
                    <input
                        type="datetime-local"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className={styles.row}>
                    <label htmlFor="notes">Notes about your trip to</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <footer>
                    <Button type="primary">Add</Button>
                    <BackButton/>
                </footer>
            </form>
        }
        </>
    );
}

export default Form;