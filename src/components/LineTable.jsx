import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { findRouteById } from "../utils/utils";

const LineTable = ({ slectedLine, routeId }) => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const { line } = slectedLine;

  useEffect(() => {
    const route = findRouteById(slectedLine, routeId || slectedLine.routes[0].id);
    setSelectedRoute(route);
  }, [slectedLine, routeId]);

  return (
    <>
      {selectedRoute ? (
        <TableContainer
          component={Paper}
          style={{ maxWidth: 400, height: 300, overflowY: "auto" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ЛИНИЯ {line}</TableCell>
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
    </>
  );
};

export default LineTable;