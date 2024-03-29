import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/App";
import * as serviceWorker from "./serviceWorker";
import config from "./auth0_config.json";
import history from "./utility/history";
import { Auth0Provider } from "./react-auth0-spa";

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      audience={config.audience}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <div className="wrapper">
        <App />
      </div>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
