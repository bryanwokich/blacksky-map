import React, {useState} from 'react';
// MapBox
import 'mapbox-gl/dist/mapbox-gl.css';

import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';


import MapBoxWrapper from "./modules/Map/components/MapBoxWrapper";
import {MAPBOX_TOKEN} from "./constants/constants";
import Map from "react-map-gl";
import useWindowSize from "./hooks/useWindowSize";

//





function App(){
  const data = [
    {sourcePosition: [-122.41669, 37.7853], targetPosition: [-121.41669, 37.781]}
  ];


  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 1,
    pitch: 0,
    bearing: 0
  };
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 1
  });

  const {width, height} = useWindowSize()

  return <div className="bmw-map-app">
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
      </Map>
    </DeckGL>
    </div>
}

export default App