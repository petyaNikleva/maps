import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLineDataQuery } from "../store";

import Map from "../components/Map";
import LineTable from "../components/LineTable";

const Details = () => {
  const { line } = useParams();
  const {
    data: lineData,
    isLoading: lineDataLoading,
    isError: lineDataError,
  } = useGetLineDataQuery(line);

  const [currentLine, setCurrentLines] = useState(null);

  useEffect(() => {
    if (lineData) {
      setCurrentLines(lineData);
    }
  }, [lineData]);

  return (
    <div>
      {currentLine && <LineTable currentLine={currentLine} />}
      {currentLine && <Map lines={[currentLine]} />}

      {lineDataLoading && <p>Loading...</p>}
      {lineDataError && <p>Error fetching data</p>}
    </div>
  );
};

export default Details;
