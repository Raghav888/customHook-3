import { useEffect, useState } from "react";
import "./styles.css";
import fakeFetch from "./fake-fetch";

const useAsync = (msg) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function callAsync(load, shouldFail) {
      setStatus("loading");
      try {
        const response = await fakeFetch(load, shouldFail);
        setStatus("success");
        setData(response);
      } catch (error) {
        setStatus("error");
        setError(error);
      }
    }
    callAsync(msg);
  }, [msg]);

  return { data, status, error };
};

export default function App() {
  const { status, data, error } = useAsync("little little"); //can sent data consider an making api call by sending msg
  return (
    <div className="App">
      {status === "loading" && <p> Loading... </p>}
      {status === "error" && <p style={{ color: "red" }}> {error}</p>}
      {status === "success" && <p> {data} </p>}
    </div>
  );
}
