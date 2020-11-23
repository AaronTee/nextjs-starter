import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { WeatherApi } from "@apis/weather";
import useSWR from "swr";
// import useHttp from "@hooks/useHttp";

export const WeatherPage = () => {
  // const [_, useSWR] = useHttp(WeatherApi);
  const [dataa, setData] = useState([]);
  const [counter, setCounter] = useState(0);

  // const fetchData = () => {
  //   const { data, error } = useSWR(async (api) => {
  //     const a = await api.getWeather();
  //     return a;
  //   });
  //   setData(data);
  // };

  const { data, error } = useSWR("test", async (api) => {
    const a = await api.getWeather();
    return a;
  });

  return (
    <div>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{JSON.stringify(data)}</div>
      <button onClick={() => setCounter((c) => c + 1)}>Rerender</button>
    </div>
  );
};

export default WeatherPage;
