/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from ":/components/Footer";
import Header from ":/components/Header";

const DISCORD_BOT_URL =
  "https://discord.com/api/oauth2/authorize?client_id=908434595614183457&permissions=8&scope=bot";

export default function () {
  window.location.href = DISCORD_BOT_URL;
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
