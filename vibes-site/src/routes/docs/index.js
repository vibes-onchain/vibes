/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from ":/components/Footer";
import Header from ":/components/Header";

export default function () {
  window.location.href = process.env.REACT_APP_VIBES_DOCS_URL;
  return (
    <div css={CSS}>
      <Header />
      <center>
        <h1>Get the Vibes Discord Bot</h1>
      </center>
      <Footer />
    </div>
  );
}

const CSS = css`
  center h1 {
    margin: 20px auto;
  }
`;
