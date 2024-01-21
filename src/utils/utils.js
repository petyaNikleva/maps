export function findRouteById(currentLine, routeId) {
  if (currentLine && currentLine.routes && Array.isArray(currentLine.routes)) {
      const routeWithId = currentLine.routes.find(route => route.id === routeId);
      return routeWithId || null;
  } else {
      console.error("Invalid input data structure");
      return null;
  }
}