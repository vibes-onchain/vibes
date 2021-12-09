/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-tagsinput/react-tagsinput.css";
import "./App.css";

import Error404 from "./components/Error404";
import BackendContext, { BackendStore } from "./contexts/BackendContext";

// import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { ChakraProvider } from "@chakra-ui/react";

function AppRouter() {
  return (
    <Router>
      <Switch>
        {routes.map((path) => (
          <Route key={path} path={path} exact={true || path === "/"}>
            <ChakraProvider>
              {React.createElement(require(`./routes${path}`).default)}
            </ChakraProvider>
          </Route>
        ))}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

function NoMatch() {
  return <Error404 />;
}

function App() {
  return (
    <BackendStore>
      <AppRouter />
    </BackendStore>
  );
}

const routes = [
  "/setup/discord",
  "/ledger/:ledger_id/admin",
  "/ledger/:ledger_id",
  "/",
];

export default App;
