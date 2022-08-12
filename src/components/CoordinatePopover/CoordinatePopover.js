import React from "react";

function CoordinatePopover({coordinates, topics, count}) {
  return <div className="bmw-coordinate-details">
    Coordinates: {coordinates[0]}, {coordinates[1]} <br/>
    Topics: {topics.join(', ')}
    <br/>
    Total Events: {count}
  </div>
}

export default CoordinatePopover