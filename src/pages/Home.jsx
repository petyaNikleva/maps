import { useGetAllDataQuery } from "../store";

import LineList from "../components/LineList";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Home() {
  const [lines, setLines] = useState([]);
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

  const [typeVehicle, setTypeVehicle] = useState('');

  const filterHandler = (e) => {
    let selectedType = e.target.name;
    console.log(allData);
    selectedType === "All"
      ? setLines(allData)
      : setLines(
          allData.filter((x) => {
            return x.line.includes(selectedType);
          })
        );
  };


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
      <InputLabel id="vehicle-type-select-label">Vehicle Type</InputLabel>
      <Select
        labelId="vehicle-type-select-label"
        id="vehicle-type-select"
        value={typeVehicle}
        label="typeVehicle"
        onChange={handleChange}
      > 
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
