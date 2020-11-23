import "@styles/main.scss";
import { wrapper } from "@stores/redux/index";
import App from "~/app";

function MyApp({ Component, pageProps }) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}

export default wrapper.withRedux(MyApp);
