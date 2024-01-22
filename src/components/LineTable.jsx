import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { combineRoutes, findRouteById } from "../utils/utils";
import { DEFAULT_ID } from "../constants";

const LineTable = ({ sеlectedLine, routeId }) => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [twoToutesTable, setTwoToutesTable] = useState(false);

  useEffect(() => {
    if (routeId !== DEFAULT_ID) {
      const route = findRouteById(sеlectedLine, routeId);
      setSelectedRoute(route);
      setTwoToutesTable(false);
    } else {
      setTwoToutesTable(true);
    }
  }, [sеlectedLine, routeId]);

  const { line, routes } = sеlectedLine;
  const [firstRoute, secondRoute] = routes;
  const { name: firstRouteName, stops: firstRouteStops } = firstRoute;
  const { name: secondRouteName, stops: secondRouteStops } = secondRoute;
  const combinedStops = combineRoutes(firstRouteStops, secondRouteStops);

  const commonTableContainerStyles = {
    width: "320px",
    height: "70vh",
    maxHeight: "800px",
    overflowY: "auto",
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="5rem"
    >
      {twoToutesTable ? (
        <TableContainer
          component={Paper}
          sx={{ ...commonTableContainerStyles }}
        >
          <Typography fontWeight="bold" align="center">
            ЛИНИЯ {line}
          </Typography>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {firstRouteName}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {secondRouteName}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {combinedStops.map(({ firstRouteStop, secondRouteStop }) => (
                <TableRow key={firstRouteStop.id}>
                  <TableCell>
                    {firstRouteStop ? firstRouteStop.name : ""}
                  </TableCell>
                  <TableCell>
                    {secondRouteStop ? secondRouteStop.name : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      {selectedRoute && !twoToutesTable ? (
        <TableContainer
          component={Paper}
          sx={{ ...commonTableContainerStyles }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold" align="center">
                    ЛИНИЯ {line}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRoute.stops.map((stop) => (
                <TableRow key={stop.id}>
                  <TableCell>{stop.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  );
};

export default LineTable;
