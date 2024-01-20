import { MapContainer, TileLayer } from "react-leaflet";
import LineMap from "./LineMap";

const Map = ({ lines }) => {
  return (
    <div>
      <MapContainer center={[42.697708, 23.321867]} zoom={14}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {lines.map((lineInfo) => (
          <LineMap key={lineInfo.line} lineInfo={lineInfo} />
        ))}
        {/* <LineMap key={lines[0].line} lineInfo={lines[0]} /> */}
      </MapContainer>
    </div>
  );
};

export default Map;
