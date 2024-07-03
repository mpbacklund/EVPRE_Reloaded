import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import AddressBar from './MapAddressBar';

// Define the custom user location icon using divIcon
const customIcon = L.divIcon({
    className: 'animated-marker', // Use the CSS class for styling
    iconSize: [22, 22], // Size of the icon
    //popupAnchor: [11, 11] // Position of the popup relative to the icon
});

const MapComponent = () => {
    const [route, setRoute] = useState([]); // route between two points; array of lat, lng points
    const [location, setLocation] = useState(null); // location of user
    const [endMarker, setEndMarker] = useState(null); // location for end marker on map
    const [startMarker, setStartMarker] = useState(null); // location for start marker on map
    const [firstTimeLocation, setFirstTimeLocation] = useState(true); // true if the user's location hasn't been found for the first time yet
    const [locationClicked, setLocationClicked] = useState(false); // the state of this doesn't matter; it is used to notify a child element when the user is clicked

    const mapRef = useRef(); // reference to the leaflet map DOM element

    // set up the webpage to watch the user's location
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            if (firstTimeLocation && mapRef.current) {
              setFirstTimeLocation(false);
              mapRef.current.setView([position.coords.latitude, position.coords.longitude], 15);
            }
          },
          (error) => {
          }
        );
    
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      }, []); // Empty dependency array to run effect only once

    // Handle map click event (place marker wherever user clicks)
    const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        setEndMarker({ lat, lng });
    };

    // Custom hook to add click event listener to the map
    const AddMarkerOnClick = () => {
        const map = useMapEvents({
            click: handleClick,
        });
        return null;
    };

    // reset from start marker to the user's position when user clicks on their location icon
    const handleLocationClick = () => {
        setStartMarker(null); // set startMarker to null (removes it from the map)

        // toggle locationClicked to notify the address bar that the location was clicked
        if (locationClicked) {
          setLocationClicked(false);
        } else {
          setLocationClicked(true);
        }

        //rezoom to the location marker
        if (mapRef.current) {
          if (location && endMarker) {
              const bounds = L.latLngBounds([location, endMarker]);
              mapRef.current.fitBounds(bounds, {
                paddingTopLeft: [50, 50],
                paddingBottomRight: [50, 160]
              });
          } else if (location) {
              mapRef.current.setView([location.lat, location.lng], 15);
          }
      }
    }

    const handleNewRoute = (data) => {
        setRoute(data.data);
        console.log(route);
    }

    const handleNewStartAddress = (data) => {
        if (data === null) {
            setStartMarker(null);
        }
        else {
            setStartMarker({ lat: data.lat, lng: data.lng });
        }
    }

    const handleNewEndAddress = (data) => {
        setEndMarker({ lat: data.lat, lng: data.lng });
    }

    useEffect(() => {
      if (mapRef.current) {
          if (startMarker && endMarker) {
              const bounds = L.latLngBounds([startMarker, endMarker]);
              mapRef.current.fitBounds(bounds, {
                paddingTopLeft: [50, 50],
                paddingBottomRight: [50, 160]
              });
          } else if (startMarker) {
              mapRef.current.setView([startMarker.lat, startMarker.lng], mapRef.current.getZoom());
          }
      }
    }, [startMarker]);
  

    return (
        <div className='full-screen hasNavBarNoPadding'>
            <MapContainer
                center={{ lat: 40, lng: -110 }}
                zoom={6}
                scrollWheelZoom={true}
                zoomControl={false}
                className='full-screen'
                attributionControl={false}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={route} />
                <ZoomControl position="topright" />

                <AddMarkerOnClick />
                {/* Render the single startMarker if position is set */}
                {startMarker && (
                    <Marker position={startMarker}></Marker>
                )}
                {/* Render the single endMarker if position is set */}
                {endMarker && (
                    <Marker position={endMarker}></Marker>
                )}
                {location && (
                    <Marker position={location} icon={customIcon} eventHandlers={{ click: handleLocationClick }}></Marker>
                )}
            </MapContainer>
            <AddressBar
                startCoords={startMarker ? startMarker : location}
                endCoords={endMarker}
                onRoute={handleNewRoute}
                onNewStart={handleNewStartAddress}
                onNewEnd={handleNewEndAddress}
                locationClicked={locationClicked}
            />
        </div>
    );
};

export default MapComponent;
