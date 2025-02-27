import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './LocationPicker.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 19.4326, // Centro de México
  lng: -99.1332
};

const LocationPicker = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
      setMapError('API Key de Google Maps no encontrada');
    }
  }, []);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      if (response.results[0]) {
        const fullAddress = response.results[0].formatted_address;
        setAddress(fullAddress);
        onLocationSelect({
          address: fullAddress,
          coordinates: { lat, lng }
        });
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      setMapError('Error al obtener la dirección');
    }
  };

  const handleLoad = () => {
    setMapLoaded(true);
    setMapError(null);
  };

  const handleError = (error) => {
    console.error('Error al cargar el mapa:', error);
    setMapError('Error al cargar el mapa de Google. Por favor, verifica la configuración de facturación en Google Cloud Console.');
  };

  if (mapError) {
    return (
      <div className="location-picker-error p-4 border rounded-lg bg-red-50">
        <h3 className="text-red-700 font-semibold mb-2">Error al cargar el mapa</h3>
        <p className="text-red-600">{mapError}</p>
        <p className="mt-2 text-sm text-gray-600">
          Por favor, ingresa la dirección manualmente o contacta al administrador del sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="location-picker">
      <LoadScript 
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onLoad={handleLoad}
        onError={handleError}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation || defaultCenter}
          zoom={12}
          onClick={handleMapClick}
          onLoad={handleLoad}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
            />
          )}
        </GoogleMap>
      </LoadScript>
      {address && (
        <div className="selected-address mt-4">
          <strong>Dirección seleccionada:</strong>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
