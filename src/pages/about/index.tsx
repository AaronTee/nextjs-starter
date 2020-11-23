import { initializeStore, StoreState, wrapper } from "@stores/redux";
import { setText } from "@stores/redux/Playground/actions";
import Head from "next/head";
import { connect, useSelector } from "react-redux";

const AboutUs = () => {
  const text = useSelector<StoreState, string>(
    (state) => state.playground.text
  );
  return (
    <div>
      <Head>
        <title>About Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>About us</h1>
        <h2>Home is saying {text}</h2>
      </main>
    </div>
  );
};

export default AboutUs;
