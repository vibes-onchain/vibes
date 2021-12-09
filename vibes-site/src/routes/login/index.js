/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import useSession from ":/lib/useSession";

export default function () {
  const session = useSession();
  return <div css={CSS}>
    <h1>Login</h1>
  </div>;
}

const CSS = css`
`;