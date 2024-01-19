import { useEffect, useState } from "react";
import { useGetAllDataQuery } from "../store";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

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
      <div>
        <MapContainer center={[42.697708, 23.321867]} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default MainMap;
