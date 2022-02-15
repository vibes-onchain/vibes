/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

import React from "react";

import vibesicon from ":/assets/img/vibes-hand.png";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="Footer" css={CSS}>
      <div className="page-container">
        Built with 💖 and good vibes by 
        <br /> a decentralized team
      </div>
    </div>
  );
}

const CSS = css`
  .page-container {
  }
  body.dark-theme & {
    .copyright,
    .copyright a {
      color: #ccc;
    }
    .text .links a {
      color: #ccc;
    }
  }
`;
