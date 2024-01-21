import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const LineTable = ({ currentLine }) => {
  const { line, routes } = currentLine;
  const firstRoute = routes[0];
  const secondRoute = routes[1];

  const {
    name: firstRouteName,
  } = firstRoute;

  const {
    name: secondRouteName,
  } = secondRoute;

  const [selectedRoute, setSelectedRoute] = useState(firstRoute);

  const handleChange = (e) => {
    const selectedRouteName = e.target.value;

    if (selectedRouteName === firstRouteName) {
      setSelectedRoute(firstRoute);
    } else {
      setSelectedRoute(secondRoute);
    }
  };

  return (
    <>
    <Box marginBottom={12}>
      <FormControl style={{ maxWidth: 400}}>
        <InputLabel>Маршрут</InputLabel>
        <Select
          value={selectedRoute.name}
          label="typeVehicle"
          onChange={handleChange}
        >
          <MenuItem value={firstRouteName}>{firstRouteName}</MenuItem>
          <MenuItem value={secondRouteName}>{secondRouteName}</MenuItem>
        </Select>
      </FormControl>
    </Box>  
      {selectedRoute.stops.length > 0 ? (
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