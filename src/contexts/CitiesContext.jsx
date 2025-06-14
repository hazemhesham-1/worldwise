import PropTypes from "prop-types";
import { useEffect, useReducer, useCallback, createContext, useContext } from "react";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: null
};

function reducer(state, action) {
    switch(action.type) {
        case "loading": return { ...state, isLoading: true };
        case "failed": return { ...state, error: action.payload, isLoading: false };
        case "cities/loaded": return { ...state, cities: action.payload, isLoading: false };
        case "city/loaded": return { ...state, currentCity: action.payload, isLoading: false };
        case "city/added": return { ...state, cities: [...state.cities, action.payload], currentCity: action.payload, isLoading: false };
        case "city/deleted": return { ...state, cities: state.cities.filter(city => city.id !== action.payload.id), isLoading: false };
        default: throw new Error("Unknown action type");
    }
}

function CitiesProvider({ children }) {
    const [states, dispatch] = useReducer(reducer, initialState);
    const { cities, currentCity, isLoading, error } = states;
    
    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${window.location.origin}:9000/cities`);
                if(!res.ok) throw new Error("Faild to fetch cities data");

                const json = await res.json();
                dispatch({ type: "cities/loaded", payload: json });
            }
            catch(err) {
                dispatch({ type: "failed", payload: err.message });
            }
        }

        fetchCities();
    }, []);

    const getCity = useCallback(async (id) => {
        if(currentCity.id == id) return;
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${window.location.origin}:9000/cities/${id}`);
            if(!res.ok) throw new Error("Faild to fetch city data");

            const json = await res.json();
            dispatch({ type: "city/loaded", payload: json ? json : {} });
        }
        catch(err) {
            dispatch({ type: "failed", payload: err.message });
        }
    }, [currentCity.id]);
    
    async function createCity(newCity) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${window.location.origin}:9000/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-type": "application/json",
                }
            });

            const json = await res.json();
            dispatch({ type: "city/added", payload: json });
        }
        catch {
            dispatch({
                type: "failed",
                payload: "There was an error adding the city..."
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${window.location.origin}:9000/cities/${id}`, {
                method: "DELETE"
            });

            const json = await res.json();
            dispatch({ type: "city/deleted", payload: json });
        }
        catch {
            dispatch({
                type: "failed",
                payload: "There was an error deleting the city..."
            });
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, error, getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if(context === undefined) {
        throw new Error("CitiesContext was used outside of the CitiesProvider");
    }

    return context;
}

CitiesProvider.propTypes = {
    children: PropTypes.any
};

export { CitiesProvider, useCities };