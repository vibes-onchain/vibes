/** @jsxImportSource @emotion/react */

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-tagsinput/react-tagsinput.css";
import "./App.css";

import Error404 from "./components/Error404";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

function AppRouter() {
  return (
    <Router>
      <Switch>
        {routes.map((path) => (
          <Route key={path} path={path} exact={true || path === "/"}>
            {React.createElement(require(`./routes${path}`).default)}
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
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

const routes = [
  "/setup/discord",
  "/ledger/:ledger_id/admin",
  "/ledger/:ledger_id/profile/:profile_id/shareable",
  "/ledger/:ledger_id/profile/:profile_id/entries",
  "/ledger/:ledger_id/profile/:profile_id",
  "/ledger/:ledger_id/entries",
  "/ledger/:ledger_id",
  "/community",
  "/",
];

export default App;
