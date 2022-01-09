/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

import React from "react";

import vibesicon from ":/assets/img/vibes-hand.png";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="Footer" css={CSS}>
      <div className="page-container">
        <div className="logo">
          <img src={vibesicon} />
        </div>
        <div className="text">
          <div className="links">
            <a href="https://twitter.com/vibesbotgg">Twitter</a>
            <a href={process.env.REACT_APP_DISCORD_INVITE}>Discord</a>
            <a href="https://github.com/spot-foundation/vibes">Github</a>
            {/* <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a> */}
          </div>
          <div className="copyright">
            &copy; {year} <a href="http://spot.foundation">Spot Foundation</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = css`
  .page-container {
    height: 220px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    color: #213f66;
    @media (min-width: 600px) {
      padding: 20px;
    }
    br.mobile-only {
      display: block;
      @media (min-width: 600px) {
        display: none;
      }
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 600px) {
      flex-direction: row;
    }
    .logo {
      font-size: 40px;
      margin: 10px;
      width: 100px;
      height: auto;
      text-align: center;
      img {
        /* width: 100%; */
      }
      @media (min-width: 600px) {
        padding-right: 30px;
      }
    }
    .copyright a {
      color: #312e3f;
    }
    .text {
      font-size: 14px;
      @media (min-width: 600px) {
        font-size: 15px;
      }
      line-height: 2em;
      .links {
        a {
          color: #312e3f;
          text-decoration: none;
          font-weight: 600;
          margin-right: 5px;
          @media (min-width: 600px) {
            margin-right: 15px;
          }
          &:last-of-type {
            margin-right: none;
          }
        }
      }
    }
  }
`;
