import React from 'react'
import DeckGL from '@deck.gl/react'
import {LineLayer} from '@deck.gl/layers';
import {Map as Mapbox} from 'react-map-gl'

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};


function Map() {


  const layers = [
    new LineLayer({id: 'line-layer', data})
  ]

  const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYnJ5YW53b2tpY2giLCJhIjoiY2w2bnNvenl6MDQxcDNpcXVkNDhoc2pxbSJ9.2MlHpP4yxcy3kCpaBRTLPg"


  return <DeckGL
    initialViewState={INITIAL_VIEW_STATE}
    controller={true}
    layers={layers}
  >
    <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
  </DeckGL>

}

export default Map