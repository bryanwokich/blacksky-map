import React, {useState} from 'react';
// MapBox
import 'mapbox-gl/dist/mapbox-gl.css';

import DeckGL from '@deck.gl/react';
import {LineLayer, TextLayer} from '@deck.gl/layers';
import {ScatterplotLayer} from 'deck.gl';

import {MAPBOX_TOKEN} from "./constants/constants";
import Map from "react-map-gl";
import useWindowSize from "./hooks/useWindowSize";

function App(){
  const data = [
    {sourcePosition: [-122.41669, 37.7853], targetPosition: [-112.41669, 39.781]},
  ];

  const bart = new ScatterplotLayer({
    id: 'bart-stations',
    data: [
      {name: 'Colma', passengers: 4214, coordinates: [-122.466233, 37.684638]},
      {name: 'Civic Center', passengers: 24798, coordinates: [-122.413756,37.779528]},
    ],
    stroked: false,
    filled: true,
    getPosition: data => data.coordinates,
    getRadius: data => Math.sqrt(data.passengers),
    getFillColor: [255, 200, 0]
  });

  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 1,
    pitch: 0,
    bearing: 0
  };
  const layers = [
    new LineLayer({id: 'line-layer', data}),
    bart

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