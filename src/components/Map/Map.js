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
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });

        let directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            geocoder: {
                countries: ['US'],
                proximity: [lng, lat],
            },
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        // Add directions
        map.addControl(directions, 'top-left');

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        map.on('load', () => {
            directions.setOrigin(Object.values(originAddress).join(' '));
            directions.setDestination(destinationAddress);
        });

        // Clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="map" ref={mapContainerRef} />;
};

export default Map;
