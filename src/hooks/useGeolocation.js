import { useState } from "react";

function useGeolocation(defaultLocation = null) {
    const [location, setLocation] = useState(defaultLocation);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function getLocation() {
        setIsLoading(true);

        if(!navigator.geolocation) {
            setError("Geolocation is not supported by this browser");
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, long: longitude });
            setIsLoading(false);
        }, (err) => {
            setIsLoading(false);
            switch(err.code) {
                case err.PERMISSION_DENIED: setError("User denied request for Geolocation"); break;
                case err.POSITION_UNAVAILABLE: setError("Location information is unavailable"); break;
                case err.TIMEOUT: setError("The request to get user location timed out"); break;
                default: setError("Unknown error occurred"); break;
            }
        });
    }

    console.log({ location, getLocation, isLoading, error })
    return { location, getLocation, isLoading, error };
}

export default useGeolocation;