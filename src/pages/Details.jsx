import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useGetLineDataQuery } from "../store";
import Map from "../components/Map";
import LineTable from "../components/LineTable";


const Details = () => {
  const [slectedLine, setSlectedLine] = useState(null);
  const [routeId, setRouteId] = useState("");
  const { line } = useParams();
  const {
    data: lineData,
    isLoading: lineDataLoading,
    isError: lineDataError,
  } = useGetLineDataQuery(line);

  useEffect(() => {
    if (lineData) {
      setSlectedLine(lineData);
    }
  }, [lineData]);


  const handleChange = (e) => {
    const selectedRouteId = e.target.value;
    setRouteId(selectedRouteId);
  };

  return (
    <div>
      {slectedLine && (
        <FormControl fullWidth>
          <InputLabel>Change</InputLabel>
          <Select value={routeId} label="route" onChange={handleChange}>
            <MenuItem value={slectedLine.routes[0].id}>
              {slectedLine.routes[0].name}
            </MenuItem>
            <MenuItem value={slectedLine.routes[1].id}>
              {slectedLine.routes[1].name}
            </MenuItem>
          </Select>
        </FormControl>
      )}
      {slectedLine && <LineTable slectedLine={slectedLine} routeId={routeId} />}
      {slectedLine && <Map lines={[slectedLine]} routeId={routeId} />}

      {lineDataLoading && <p>Loading...</p>}
      {lineDataError && <p>Error fetching data</p>}
    </div>
  );
};

export default Details;
