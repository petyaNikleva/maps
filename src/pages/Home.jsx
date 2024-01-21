import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useGetAllDataQuery } from "../store";
import LineList from "../components/LineList";
import Map from "../components/Map";

function Home() {
  const [lines, setLines] = useState([]);
  const [typeVehicle, setTypeVehicle] = useState("");

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

    const handleChange = (e) => {
    setTypeVehicle(e.target.value);
    let selectedType = e.target.value;
    selectedType === "All"
      ? setLines(allData)
      : setLines(
          allData.filter((x) => {
            return x.line.includes(selectedType);
          })
        );
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Vehicle Type</InputLabel>
        <Select value={typeVehicle} label="typeVehicle" onChange={handleChange}>
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"A"}>Bus</MenuItem>
          <MenuItem value={"TM"}>Tram</MenuItem>
          <MenuItem value={"TB"}>Trolleybus</MenuItem>
        </Select>
      </FormControl>
      {lines && <LineList lines={lines} />}
      {lines && <Map lines={lines} />}
      {allDataLoading && <p>Loading...</p>}
      {allDataError && <p>Error fetching data</p>}
    </Box>
  );
}

export default Home;
