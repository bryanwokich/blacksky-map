/* global document */
import React, {useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import {MAPBOX_TOKEN} from "./constants/constants";
import useWindowSize from "./hooks/useWindowSize";


function Basic() {
  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
      }}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
}


function MapBoxWrapper() {
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 1
  });

  const {width, height} = useWindowSize()
  return (
    <Map
      latitude={viewState.latitude}
      longitude={viewState.longitude}
      zoom={viewState.zoom}
      onMove={evt => setViewState(evt.viewState)}
      style={{width, height}}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
    </Map>
  );
}

function App(){
  return <div className="bmw-map-app">
    <MapBoxWrapper />
  </div>
}

export default App