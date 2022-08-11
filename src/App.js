import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBoxWrapper from "./modules/Map/components/MapBoxWrapper";





function App(){
  return <div className="bmw-map-app">
    <MapBoxWrapper />
  </div>
}

export default App