import React, {useState, useMemo} from 'react';
// MapBox
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

import DeckGL from '@deck.gl/react';
import {ColumnLayer} from '@deck.gl/layers';


import {EVENT_COLORS, INITIAL_VIEW_STATE, MAPBOX_TOKEN} from "./constants/constants";
import Map from "react-map-gl";
import {EVENTS} from "./constants/events";

function App() {
  const [activeCoordinate, setActiveCoordinate] = useState(null)
  const createColumnLayer = useMemo(() => {
    return ({topicKey, events}) => {
      const topicKeyUp = topicKey.toUpperCase()
      const columnData = events.map((eventItem) => {
        return {
          centroid: eventItem.coordinates,
          value: eventItem.count,
          rawData: eventItem
        }
      })
      return new ColumnLayer({
        id: topicKey,
        data: columnData,
        diskResolution: 120,
        radius: 2500,
        extruded: true,
        pickable: true,
        elevationScale: 5000,
        onHover: ({object, picked}) => {
          if(picked){
            setActiveCoordinate(object.rawData)
          } else {
            setActiveCoordinate(null)
          }

        },
        onClick: ({object}) => {
          setActiveCoordinate(object.rawData)
        },
        getPosition: d => d.centroid,
        getFillColor: d => {
          if (!EVENT_COLORS.hasOwnProperty(topicKeyUp)) {
            console.warn('ADD', topicKeyUp)
            return [0, 0, 0]
          }
          return EVENT_COLORS[topicKeyUp]
        },
        getElevation: d => d.value
      });
    }
  }, [])

  const layers = useMemo(() => {
    const groupedEvents = {}
    EVENTS.items.forEach(eventItem => {
      const coordinates = `${eventItem.geometry.coordinates}`
      const geometricKey = coordinates
      let groupedEventCount = 0
      // Group our events using a geographic key.  This will let us get a count
      if (groupedEvents.hasOwnProperty(geometricKey)) {
        groupedEvents[geometricKey].count++
        const potentialDuplicateTopics = groupedEvents[geometricKey].topics.concat(eventItem.properties.tag.topic)
        groupedEvents[geometricKey].topics = potentialDuplicateTopics.filter((item, index) => {
          return potentialDuplicateTopics.indexOf(item) == index
        })
      } else {
        groupedEvents[geometricKey] = {
          coordinates: eventItem.geometry.coordinates,
          count: 1,
          topics: eventItem.properties.tag.topic
        }
      }
    })

    // We have now grouped items that have the same coordinates.  This will sort them
    // into topics
    const eventsSortedByTopic = {}
    Object.keys(groupedEvents).forEach(coordinate => {
      const topicKey = groupedEvents[coordinate].topics.length == 1 ? `${groupedEvents[coordinate].topics}` : 'multiple_topics'
      if (eventsSortedByTopic.hasOwnProperty(topicKey)) {
        eventsSortedByTopic[topicKey].push(groupedEvents[coordinate])
      } else {
        eventsSortedByTopic[topicKey] = [groupedEvents[coordinate]]
      }
    })

    const layers = []

    // Finally, we loop the sorted events to create our Column Layers
    const result = Object.keys(eventsSortedByTopic).map(topicKey => {
      return createColumnLayer({
        events: eventsSortedByTopic[topicKey],
        topicKey
      })
    })
    return result
  }, [])

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
      {activeCoordinate && <div className="bmw-coordinate-details">
        Coordinates: {activeCoordinate.coordinates[0]}, {activeCoordinate.coordinates[1]} <br/>
        Topics: {activeCoordinate.topics.join(', ')}
        <br/>
        Total Events: {activeCoordinate.count}
      </div>}
    </DeckGL>
  </div>
}

export default App