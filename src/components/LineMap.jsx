import { CircleMarker, Polyline, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { findRouteById } from "../utils/utils";
import { DEFAULT_ID, BLUE_LINE_COLOR, RED_LINE_COLOR } from "../constants";

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

  if (routeId && routeId !== DEFAULT_ID) {
    const route = findRouteById(lineInfo, routeId);
    return (
      <>
        {lineInfo && (
          <div>
            {renderRouteStops(route.stops, BLUE_LINE_COLOR)}
            {renderRoutePolyline(route.segments, BLUE_LINE_COLOR, line)}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {lineInfo && (
        <div>
          {renderRouteStops(firstRouteStops, BLUE_LINE_COLOR)}
          {renderRoutePolyline(firstRouteSegments, BLUE_LINE_COLOR, line)}
          {renderRouteStops(secondRouteStops, RED_LINE_COLOR)}
          {renderRoutePolyline(secondRouteSegments, RED_LINE_COLOR, line)}
        </div>
      )}
    </>
  );
};

export default LineMap;
