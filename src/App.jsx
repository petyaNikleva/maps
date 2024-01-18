import "./App.css";
import Header from "./components/Header";
import MainMap from "./components/MainMap";
import { useGetAllDataQuery, useGetLineDataQuery } from "./store";

function App() {
  // const {
  //   data: allData,
  //   isLoading: allDataLoading,
  //   isError: allDataError,
  // } = useGetAllDataQuery();
  // const {
  //   data: lineData,
  //   isLoading: lineDataLoading,
  //   isError: lineDataError,
  // } = useGetLineDataQuery("A111"); // I can r\Replace 'A111' with the desired line

  // if (allDataLoading || lineDataLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (allDataError || lineDataError) {
  //   return <p>Error fetching data</p>;
  // }

  return (
    <div>
      <Header />
      <MainMap />
      {/* <h2>All Data</h2>
      <pre>{JSON.stringify(allData)}</pre>

      <h2>Data by Line (A111)</h2>
      <pre>{JSON.stringify(lineData)}</pre> */}
    </div>
  );
}

export default App;
