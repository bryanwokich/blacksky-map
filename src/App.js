import React, {useState} from 'react';
// MapBox
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

import DeckGL from '@deck.gl/react';
import {INITIAL_VIEW_STATE, MAPBOX_TOKEN} from "./constants/constants";
import Map from "react-map-gl";
import CoordinatePopover from "./components/CoordinatePopover";
import useEvents from "./hooks/useEvents";

function App() {
  const [activeCoordinate, setActiveCoordinate] = useState(null)

  const hoverAction = setActiveCoordinate
  const [layers] = useEvents(hoverAction)
  return <div className="bmw-map-app">
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      />
      {activeCoordinate && <CoordinatePopover
        coordinates={activeCoordinate.coordinates}
        topics={activeCoordinate.topics}
        count={activeCoordinate.count}
      />
      }
    </DeckGL>
  </div>
}

export default App