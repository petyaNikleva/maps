export function findRouteById(currentLine, routeId) {
  if (currentLine && currentLine.routes && Array.isArray(currentLine.routes)) {
      const routeWithId = currentLine.routes.find(route => route.id === routeId);
      return routeWithId || null;
  } else {
      console.error("Invalid input data structure");
      return null;
  }
}

export const combineRoutes = (firstRouteStops, secondRouteStops) => {
  const combinedStops = [];
  const minLength = Math.min(firstRouteStops.length, secondRouteStops.length);
  
  for (let i = 0; i < minLength; i++) {
    combinedStops.push({
      firstRouteStop: firstRouteStops[i],
      secondRouteStop: secondRouteStops[i],
    });
  }

  return combinedStops;
};