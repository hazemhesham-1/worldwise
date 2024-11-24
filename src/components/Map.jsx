import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import useUrlPosition from "../hooks/useUrlPosition";
import Button from "./Button";

const Map = () => {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([38.896, -77.037]);
    const [mapLat, mapLong] = useUrlPosition();
    const { location, getLocation, isLoading } = useGeolocation();

    useEffect(() => {
        if(mapLat && mapLong) setMapPosition([mapLat, mapLong]);
    }, [mapLat, mapLong]);

    useEffect(() => {
        if(location) setMapPosition([location.lat, location.long]);
    }, [location]);

    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getLocation}>
                {isLoading ? "Locating..." : "Use your location"}
            </Button>
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={8}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>
                    <Marker
                        position={[city.position.lat, city.position.long]}
                        key={city.id}
                    >
                        <Popup>
                            <img src={city.imgURL} alt="flag"/>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                )}
                <ChangePosition position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

const ChangePosition = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
}

ChangePosition.propTypes = {
    position: PropTypes.array
};

const DetectClick = () => {
    const navigate = useNavigate();
    useMapEvents({
        click: e => {
            const { lat, lng } = e.latlng;
            navigate(`form?lat=${lat}&long=${lng}`);
        }
    })
};

export default Map;