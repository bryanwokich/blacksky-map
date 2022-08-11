import React, {useState} from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import Map from "react-map-gl";
import {MAPBOX_TOKEN} from "../../../../constants/constants";

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
export default MapBoxWrapper