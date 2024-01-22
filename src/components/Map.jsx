import { MapContainer, TileLayer } from "react-leaflet";
import LineMap from './LineMap'

const Map = ({ lines, routeId }) => {
  return (
    <div className="mapContainer" style={{  
      width: "100%",
      height: "81.25vh"}}>
      <MapContainer center={[42.69498831431072, 23.320066674550368]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {lines.map((lineInfo) => (
          <LineMap key={lineInfo.line} lineInfo={lineInfo} routeId={routeId} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
