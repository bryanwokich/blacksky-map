import {useMemo} from "react";
import {EVENTS} from "../constants/events";
import {EVENT_COLORS} from "../constants/constants";
import {ColumnLayer} from '@deck.gl/layers';


const createColumnLayer = ({topicKey, events, hoverAction}) => {
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
      if(picked) {
        hoverAction(object.rawData)
      } else{
        hoverAction(null)
      }
    },
    //   ({object, picked}) => {
    //   // if(picked){
    //   //   setActiveCoordinate(object.rawData)
    //   // } else {
    //   //   setActiveCoordinate(null)
    //   // }
    // },

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


function useEvents(hoverAction) {
  const layers = useMemo(() => {
    const groupedEvents = {}
    EVENTS.items.forEach(eventItem => {
      const coordinates = `${eventItem.geometry.coordinates}`
      const geometricKey = coordinates
      // Group our events using a geographic key.  This will let us get a count
      if (groupedEvents.hasOwnProperty(geometricKey)) {
        groupedEvents[geometricKey].count++
        const potentialDuplicateTopics = groupedEvents[geometricKey].topics.concat(eventItem.properties.tag.topic)
        groupedEvents[geometricKey].topics = potentialDuplicateTopics.filter((item, index) => {
          return potentialDuplicateTopics.indexOf(item) === index
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
      const topicKey = groupedEvents[coordinate].topics.length === 1 ? `${groupedEvents[coordinate].topics}` : 'multiple_topics'
      if (eventsSortedByTopic.hasOwnProperty(topicKey)) {
        eventsSortedByTopic[topicKey].push(groupedEvents[coordinate])
      } else {
        eventsSortedByTopic[topicKey] = [groupedEvents[coordinate]]
      }
    })

    // Finally, we loop the sorted events to create our Column Layers
    const result = Object.keys(eventsSortedByTopic).map(topicKey => {
      return createColumnLayer({
        events: eventsSortedByTopic[topicKey],
        topicKey,
        hoverAction
      })
    })
    return [result]
  }, [hoverAction])

  return [layers]
}

export default useEvents