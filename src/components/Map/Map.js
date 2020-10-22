import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import './map.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;

const Map = ({ latitude, longitude, originAddress, destinationAddress }) => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(longitude);
    const [lat, setLat] = useState(latitude);
    const [zoom, setZoom] = useState(12);

    // Initialize map when component mounts
    useEffect(() => {
        let directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            geocoder: {
                countries: ['US'],
                proximity: [lng, lat],
            },
        });

        let map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });

        let navControl = new mapboxgl.NavigationControl();
        // Add navigation control (the +/- zoom buttons)

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

        // unfortunately, we're going to have to grab references
        // to the directions inputs on the map because they only
        // seem to get populated with origin/destination strings
        // one time on page load even though our Map component is mounting and unmounting

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        map.on('load', () => {
            directions.setOrigin(originAddress);
            const originInput = document.querySelector(
                '#mapbox-directions-origin-input input'
            );

            const destinationInput = document.querySelector(
                '#mapbox-directions-destination-input input'
            );

            directions.setDestination(destinationAddress);

            // this is not ideal, but we need to wait and see if the
            // directions inputs will get set by the setOrigin/setDestination
            // calls, but if they don't we're gonna force that shit
            setTimeout(() => {
                if (!originInput.value) {
                    originInput.value = originAddress;
                }
                if (!destinationInput.value) {
                    destinationInput.value = destinationAddress;
                }
            }, 500);
        });
        map.addControl(navControl, 'top-right');
        // Add directions
        map.addControl(directions, 'top-left');
        // Clean up on unmount
        return () => {
            map.removeControl(navControl);
            map.removeControl(directions);
            map.remove();
            map = null;
            directions = null;
            navControl = null;
        };
    }, [originAddress, destinationAddress]); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="map" ref={mapContainerRef} />;
};

export default Map;
