import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useGetAllDataQuery } from "../store";
import LineList from "../components/LineList";
import Map from "../components/Map";

function Home() {
  const [lines, setLines] = useState([]);
  const [typeVehicle, setTypeVehicle] = useState("All");

  const {
    data: allData,
    isLoading: allDataLoading,
    isError: allDataError,
  } = useGetAllDataQuery();

  useEffect(() => {
    if (allData) {
      setLines(allData);
    }
  }, [allData]);

  const handleTypeVehicleChange = (e) => {
    const selectedType = e.target.value;
    setTypeVehicle(selectedType);
    setLines(selectedType === "All" ? allData : allData.filter((x) => x.line.includes(selectedType)));
  };

  return (
    <Box>
      <FormControl fullWidth sx={{marginBottom: 2}}>
        <InputLabel>Vehicle Type</InputLabel>
        <Select value={typeVehicle} label="typeVehicle" onChange={handleTypeVehicleChange}>
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"A"}>Bus</MenuItem>
          <MenuItem value={"TM"}>Tram</MenuItem>
          <MenuItem value={"TB"}>Trolleybus</MenuItem>
        </Select>
      </FormControl>
      <Box display="flex" alignItems="center">
        {lines && <LineList lines={lines} />}
        {lines && <Map lines={lines} />}
      </Box>
      {allDataLoading && <p>Loading...</p>}
      {allDataError && <p>Error fetching data</p>}
    </Box>
  );
}

export default Home;