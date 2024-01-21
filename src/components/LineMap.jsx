import { CircleMarker, Polyline, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const LineMap = ({ lineInfo }) => {
  const navigate = useNavigate();
  // console.log(lineInfo);
  const { line, routes } = lineInfo;
  const firstRoute = routes[0];
  const secondRoute = routes[1];
  // console.log(secondRoute);
  const {
    transportType, // "A" autobus type
    id: firstRouteId,
    name: firstRouteName, // Ж.К. ЛЮЛИН 1,2 - Ж.К. МЛАДОСТ 1
    segments: firstRouteSegmets,
    stops: firstRouteStops,
  } = firstRoute;

  const {
    id: secondRouteId,
    name: secondRouteName,
    segments: secondRouteSegmets,
    stops: secondRouteStops,
  } = secondRoute;

  const drawPolyline = (segments) => {
    return segments.flatMap((segment) =>
      segment.coordinates.map(({ lat, lon }) => [lat, lon])
    );
  };

  const renderRouteStops = (stops, color) => (
    stops.map((stop) => (
      <CircleMarker
        key={stop.id}
        center={[stop.location.lat, stop.location.lon]}
        pathOptions={{ color }}
        radius={3}
      >
        <Popup>{stop.name}</Popup>
      </CircleMarker>
    ))
  );

  const handlePolylineClick = (line) => {
    navigate(`/details/${line}`);
  };
  
  const renderRoutePolyline = (segments, color, line) => (
    <Polyline
      pathOptions={{ color }}
      positions={drawPolyline(segments)}
      eventHandlers={{
        click: () => handlePolylineClick(line),
      }}
    />
  );

  return (
    <>
      {lineInfo && (
        <div>
          {renderRouteStops(firstRouteStops, "blue")}
          {renderRoutePolyline(firstRouteSegmets, "blue", line)}
          {renderRouteStops(secondRouteStops, "red")}
          {renderRoutePolyline(secondRouteSegmets, "red", line)}
        </div>
      )}
    </>
  );
};

export default LineMap;
