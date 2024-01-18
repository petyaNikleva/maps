import { useEffect, useState } from "react";
import { useGetAllDataQuery } from "../store";

function MainMap() {
  const [localData, setLocalData] = useState([]);
  const {
    data: allData,
    isLoading: allDataLoading,
    isError: allDataError,
  } = useGetAllDataQuery();

  useEffect(() => {
    if (allData) {
      setLocalData(allData);
    }
  }, [allData]);
  console.log(allData);

  return (
    <div>
      <h1>Titles</h1>
      {allDataLoading && <p>Loading...</p>}
      {allDataError && <p>Error fetching data</p>}

      {localData.length > 0 ? (
        <ul>
          {localData.map((lineInfo) => (
            <li key={lineInfo.line}>{lineInfo.line}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default MainMap;
