import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import './MapSelector.css';

const MapSelector = ({ onLocationSelect, initialLocation }) => {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || null);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

  const defaultCenter = {
    lat: 19.4326,
    lng: -99.1332
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setSelectedLocation(location);
        onLocationSelect(location);
        map.panTo(location);
      }
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setSelectedLocation(location);
          onLocationSelect(location);
          map?.panTo(location);
          setError('');
        },
        () => {
          setError('No se pudo obtener tu ubicación actual');
        }
      );
    } else {
      setError('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <div className="map-selector">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
      >
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedLocation || defaultCenter}
            zoom={15}
            onClick={handleMapClick}
            onLoad={setMap}
            ref={mapRef}
          >
            <div className="search-box">
              <StandaloneSearchBox
                onLoad={setSearchBox}
                onPlacesChanged={handlePlacesChanged}
              >
                <div className="search-input-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Buscar dirección..."
                    className="search-input"
                  />
                </div>
              </StandaloneSearchBox>
            </div>

            {selectedLocation && (
              <Marker
                position={selectedLocation}
                animation={2} // DROP animation
              />
            )}
          </GoogleMap>

          <button
            onClick={handleCurrentLocation}
            className="location-button"
            title="Usar mi ubicación actual"
          >
            <FaLocationArrow className="location-icon" />
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </LoadScript>
    </div>
  );
};

export default MapSelector;
