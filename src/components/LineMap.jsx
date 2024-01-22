import { CircleMarker, Polyline, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { findRouteById } from "../utils/utils";
import { blueLineColor, redLineColor } from "../constants";

const LineMap = ({ lineInfo, routeId }) => {
  const navigate = useNavigate();
  const { line, routes } = lineInfo;
  const [firstRoute, secondRoute] = routes;

  const { segments: firstRouteSegments, stops: firstRouteStops } = firstRoute;
  const { segments: secondRouteSegments, stops: secondRouteStops } = secondRoute;

  const drawPolyline = (segments) => {
    return segments.flatMap((segment) =>
      segment.coordinates.map(({ lat, lon }) => [lat, lon])
    );
  };

  const renderRouteStops = (stops, color) =>
    stops.map((stop) => (
      <CircleMarker
        key={stop.id}
        center={[stop.location.lat, stop.location.lon]}
        pathOptions={{ color }}
        radius={3}
      >
        <Popup>{stop.name}</Popup>
      </CircleMarker>
    ));

  const renderRoutePolyline = (segments, color, line) => (
    <Polyline
      pathOptions={{ color }}
      positions={drawPolyline(segments)}
      eventHandlers={{
        click: () => handlePolylineClick(line),
      }}
    />
  );

  const handlePolylineClick = (line) => {
    navigate(`/details/${line}`);
  };

  if (routeId && routeId !== "defaultId") {
    const route = findRouteById(lineInfo, routeId);
    return (
      <>
        {lineInfo && (
          <div>
            {renderRouteStops(route.stops, blueLineColor)}
            {renderRoutePolyline(route.segments, blueLineColor, line)}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {lineInfo && (
        <div>
          {renderRouteStops(firstRouteStops, blueLineColor)}
          {renderRoutePolyline(firstRouteSegments, blueLineColor, line)}
          {renderRouteStops(secondRouteStops, redLineColor)}
          {renderRoutePolyline(secondRouteSegments, redLineColor, line)}
        </div>
      )}
    </>
  );
};

export default LineMap;
