/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";

export default function () {
  return (
    <div css={CSS}>
      <Header />
      <div
      >
      </div>
      <Footer />
    </div>
  );
}

const CSS = css`
  margin: 0px auto;
  text-align: center;
  width: 100%;
  overflow: hidden;
`;