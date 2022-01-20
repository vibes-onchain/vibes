/** @jsxImportSource @emotion/react */

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Error404 from "./components/Error404";

import "./assets/css/reset.css";
import "./assets/css/tailwind.css";
import "semantic-ui-css/semantic.min.css";
import "./assets/css/semantic-ui-overrides.css";
import "react-tagsinput/react-tagsinput.css";
import "./index.css";
import "./App.css";

import ThemeContext, {
  ThemeContextExtendedProvider,
} from "./contexts/ThemeContext";

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
      <ThemeContextExtendedProvider>
        <AppRouter />
      </ThemeContextExtendedProvider>
    </QueryClientProvider>
  );
}

const routes = [
  "/setup/discord",
  "/ledger/:ledger_id/admin",
  "/ledger/:ledger_id/profile/:profile_id/shareable",
  "/ledger/:ledger_id/profile/:profile_id/entries",
  "/ledger/:ledger_id/profile/:profile_id",
  "/ledger/:ledger_id/settings",
  "/ledger/:ledger_id/entries",
  "/ledger/:ledger_id",
  "/community",
  "/",
];

export default App;
