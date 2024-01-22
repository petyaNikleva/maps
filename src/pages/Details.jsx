import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useGetLineDataQuery } from "../store";
import Map from "../components/Map";
import LineTable from "../components/LineTable";
import { DEFAULT_ID } from "../constants";

const Details = () => {
  const [sеlectedLine, setSеlectedLine] = useState(null);
  const [routeId, setRouteId] = useState(DEFAULT_ID);
  const { line } = useParams();
  const {
    data: lineData,
    isLoading: lineDataLoading,
    isError: lineDataError,
  } = useGetLineDataQuery(line);

  useEffect(() => {
    if (lineData) {
      setSеlectedLine(lineData);
    }
  }, [lineData]);

  const handleChange = (e) => {
    const selectedRouteId = e.target.value;
    setRouteId(selectedRouteId);
  };

  return (
    <div>
      {sеlectedLine && (
        <FormControl fullWidth sx={{marginBottom: 2}}>
          <InputLabel>Change</InputLabel>
          <Select value={routeId} label="route" onChange={handleChange}>
          <MenuItem value={DEFAULT_ID}>
              ВСИЧКИ СПИРКИ
            </MenuItem>
            <MenuItem value={sеlectedLine.routes[0].id}>
              {sеlectedLine.routes[0].name}
            </MenuItem>
            <MenuItem value={sеlectedLine.routes[1].id}>
              {sеlectedLine.routes[1].name}
            </MenuItem>
          </Select>
        </FormControl>
      )}
      <Box display="flex" alignItems="flex-end">
        {sеlectedLine && (
          <LineTable sеlectedLine={sеlectedLine} routeId={routeId} />
        )}
        {sеlectedLine && <Map lines={[sеlectedLine]} routeId={routeId} />}
      </Box>
      {lineDataLoading && <p>Loading...</p>}
      {lineDataError && <p>Error fetching data</p>}
    </div>
  );
};

export default Details;
