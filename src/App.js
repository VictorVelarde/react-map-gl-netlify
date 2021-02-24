import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Source, Layer } from "react-map-gl";

// See https://docs.mapbox.com/mapbox-gl-js/api/#transpiling-v2
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker"; // Load worker code separately with worker-loader
mapboxgl.workerClass = MapboxWorker; // Wire up loaded worker to be used

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const [viewport, setViewport] = React.useState({
    longitude: -3.81,
    latitude: 43.45,
    zoom: 11,
  });

  const geojson = {
    type: "FeatureCollection",
    features: [{ type: "Feature", geometry: { type: "Point", coordinates: [-3.81, 43.45] } }],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100vh"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
}

export default App;
