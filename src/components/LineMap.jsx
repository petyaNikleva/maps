import { CircleMarker, Marker, Polyline, Popup } from "react-leaflet";

const LineMap = ({ lineInfo }) => {
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
  
  const renderRoutePolyline = (segments, color) => (
    <Polyline
      pathOptions={{ color }}
      positions={drawPolyline(segments)}
    />
  );

  return (
    <>
      {lineInfo && (
        <div>
          {renderRouteStops(firstRouteStops, "blue")}
          {renderRoutePolyline(firstRouteSegmets, "blue")}
          {renderRouteStops(secondRouteStops, "red")}
          {renderRoutePolyline(secondRouteSegmets, "red")}
        </div>
      )}
    </>
  );
};

export default LineMap;
