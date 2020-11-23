import { StoreState, wrapper } from "@stores/redux";
import { setText } from "@stores/redux/Playground/actions";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const text = useSelector<StoreState, string>(
    (state) => state.playground.text
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Head>
        <title>Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{text}</h1>
        <button onClick={() => dispatch(setText("Hello Universe"))}>
          Change hello world to Hello Universe
        </button>

        <Link href="/about">
          <a>About Us</a>
        </Link>
      </main>
    </div>
  );
}
