/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";

import wave_gradient from ":/assets/img/wave-gradient-seamless.png";

import vibenomics from ":/assets/img/vibenomics.png";
import demod from ":/assets/img/demod.png";
import integrations from ":/assets/img/integrations.png";
import vibecheck from ":/assets/img/vibecheck.png";
import vibesribbon from ":/assets/img/vibes-ribbon.png";
import vibesicon from ":/assets/img/vibes-hand.png";
import spotchain_logo from ":/assets/img/spotchain.png";
import epic_sparkle from ":/assets/img/epic.png";
import rare_sparkle from ":/assets/img/rare.png";
import legendary_sparkle from ":/assets/img/legendary.png";
import og_sparkle from ":/assets/img/og.png";

export default function () {
  return (
    <div css={CSS}>
      <Header />
      <div className="hero">
        {/* <img className="cover-wave" src={wave_gradient} alt="cover" /> */}
        <div className="hero-container">
          <div className="snowflakes" aria-hidden="true">
            <div className="snowflake"><img src={epic_sparkle} /></div>
            <div className="snowflake"><img src={rare_sparkle} /></div>
            <div className="snowflake"><img src={legendary_sparkle} /></div>
            <div className="snowflake"><img src={og_sparkle} /></div>
            <div className="snowflake"><img src={epic_sparkle} /></div>
            <div className="snowflake"><img src={rare_sparkle} /></div>
            <div className="snowflake"><img src={legendary_sparkle} /></div>
            <div className="snowflake"><img src={og_sparkle} /></div>
            <div className="snowflake"><img src={epic_sparkle} /></div>
          <div className="snowflake"><img src={rare_sparkle} /></div>
          </div>
          <div className="h1">
            On-chain trust for massive, open, decentralized communities
          </div>
          <div className="caption">
            Bringing trust and reputation to web3 communities.
            <br className="hide-from-mobile" /> Everyone has a vibe, what's
            yours?
          </div>
          <a href={process.env.REACT_APP_DISCORD_BOT_URL} className="button">
            ✨ Add to Discord ✨
          </a>
        </div>
      </div>
      <div className="features">
        <div className="features-container">
          <div className="vibesbot">✨🤖 VibesBot</div>
          <div className="a-powerful">
            A powerful way to moderate and grow your web3 community
          </div>
          <div className="items">
            <div className="item">
              <div className="icon">
                <img src={vibenomics} />
              </div>
              <div className="title">Vibenomics</div>
              <div className="text">
                Not tokens, not XP. Vibes let your community socially recognize
                members for being cool with a vibenomic policy set by you or
                your DAO.
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={demod} />
              </div>
              <div className="title">Decentralized moderation</div>
              <div className="text">
                Stop scammers without burning your mods out. Vibes give your
                community progressively decentralized moderation.
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={integrations} />
              </div>
              <div className="title">Cross platform integrations</div>
              <div className="text">
                Plug into your Discord, Telegram, Discourse, or custom app. Your
                community can take their vibes with them wherever they go.
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={vibecheck} />
              </div>
              <div className="title">Onchain vibechecks</div>
              <div className="text">
                Vibes live as append only entries on your community's ledger.
                Vibechecks let you pull up historical interactions.
              </div>
            </div>
          </div>
        </div>
        <img src={vibesribbon} />
      </div>
      <div className="communities"></div>
      <div className="give-vibes-a-try">
        <a href={process.env.REACT_APP_DISCORD_BOT_URL}>
          <img src={vibesicon} />
          <div>Give Vibes a try on Discord ➝</div>
        </a>
      </div>
      <div className="footer">
        <div className="page-container">
          <div className="logo">
            <img className="icon" src={spotchain_logo} /> Powered by Spotchain
          </div>
          <div className="link-lists">
            <div className="link-list">
              <p>🛠️ Build</p>
              <a href={process.env.REACT_APP_VIBES_DOCS_URL}>Docs</a>
              <a href="https://github.com/spot-foundation/vibes">Github</a>
              <a href="https://discord.gg/Ccae6XpDBV">Support Server</a>
            </div>
            <div className="link-list">
              <p>🌎 Connect</p>
              <a href="https://twitter.com/vibesbotgg">Twitter</a>
              <a href="https://discord.gg/Ccae6XpDBV">Discord</a>
            </div>
            {/* <div className="link-list"> */}
              {/* <p>👤 Team</p> */}
              {/* <a href={process.env.REACT_APP_VIBES_DOCS_URL}>Team</a> */}
              {/* <a href="/">Terms of Use</a>
              <a href="/">Privacy Policy</a> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = css`
  margin: 0px auto;
  text-align: center;
  width: 100%;
  overflow: hidden;
  font-family: "Cabin", sans-serif;

  .hero {
    display: block;
    box-sizing: border-box;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    background-image: url(${wave_gradient});
    background-position: center center;
    background-size: cover;
    @media (min-width: 500px) {
      background-size: contain;
      background-repeat: repeat-x no-repeat;
    }
    .hero-container {
      width: 100%;
      height: 600px;
      max-height: 80vh;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      align-content: center;
      flex-direction: column;
      justify-content: center;
    }
    .h1 {
      z-index: 1;
      font-size: 40px;
      @media (min-width: 500px) {
        font-size: 58px;
      }
      font-weight: 800;
      width: 1080px;
      max-width: 90%;
      line-height: 1.1em;
      text-shadow: 0px 0px 2px rgb(255 255 255 / 10%),
        0px 0px 5px rgb(255 255 255 / 3%);
    }
    .caption {
      z-index: 1;
      padding-top: 20px;
      font-weight: 300;
      font-size: 21px;
      line-height: 1.2em;
      padding-bottom: 20px;
    }
    .button {
      z-index: 1;
      margin-top: 28px;
      background: #33363a;
      padding: 15px 20px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 500;
      color: white;
    }
    /* customizable snowflake styling */
    .snowflakes {
      z-index: 0;
    }
    .snowflake {
      color: #fff;
      font-size: 40px;
      font-family: Arial;
      text-shadow: 0 0 1px #000;
      img { width: 35px; }
    }

    @-webkit-keyframes snowflakes-fall {
      0% {
        top: -10%;
      }
      100% {
        top: 100%;
      }
    }
    @-webkit-keyframes snowflakes-shake {
      0% {
        -webkit-transform: translateX(0px);
        transform: translateX(0px);
      }
      50% {
        -webkit-transform: translateX(80px);
        transform: translateX(80px);
      }
      100% {
        -webkit-transform: translateX(0px);
        transform: translateX(0px);
      }
    }
    @keyframes snowflakes-fall {
      0% {
        top: -10%;
      }
      100% {
        top: 100%;
      }
    }
    @keyframes snowflakes-shake {
      0% {
        transform: translateX(0px);
      }
      50% {
        transform: translateX(80px);
      }
      100% {
        transform: translateX(0px);
      }
    }
    position: relative;
    .snowflakes {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .snowflake {
      position: absolute;
      top: -10%;
      z-index: 9999;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: default;
      -webkit-animation-name: snowflakes-fall, snowflakes-shake;
      -webkit-animation-duration: 10s, 3s;
      -webkit-animation-timing-function: linear, ease-in-out;
      -webkit-animation-iteration-count: infinite, infinite;
      -webkit-animation-play-state: running, running;
      animation-name: snowflakes-fall, snowflakes-shake;
      animation-duration: 10s, 3s;
      animation-timing-function: linear, ease-in-out;
      animation-iteration-count: infinite, infinite;
      animation-play-state: running, running;
    }
    .snowflake:nth-of-type(0) {
      left: 1%;
      -webkit-animation-delay: 0s, 0s;
      animation-delay: 0s, 0s;
    }
    .snowflake:nth-of-type(1) {
      left: 10%;
      -webkit-animation-delay: 1s, 1s;
      animation-delay: 1s, 1s;
    }
    .snowflake:nth-of-type(2) {
      left: 20%;
      -webkit-animation-delay: 6s, 0.5s;
      animation-delay: 6s, 0.5s;
    }
    .snowflake:nth-of-type(3) {
      left: 30%;
      -webkit-animation-delay: 4s, 2s;
      animation-delay: 4s, 2s;
    }
    .snowflake:nth-of-type(4) {
      left: 40%;
      -webkit-animation-delay: 2s, 2s;
      animation-delay: 2s, 2s;
    }
    .snowflake:nth-of-type(5) {
      left: 50%;
      -webkit-animation-delay: 8s, 3s;
      animation-delay: 8s, 3s;
    }
    .snowflake:nth-of-type(6) {
      left: 60%;
      -webkit-animation-delay: 6s, 2s;
      animation-delay: 6s, 2s;
    }
    .snowflake:nth-of-type(7) {
      left: 70%;
      -webkit-animation-delay: 2.5s, 1s;
      animation-delay: 2.5s, 1s;
    }
    .snowflake:nth-of-type(8) {
      left: 80%;
      -webkit-animation-delay: 1s, 0s;
      animation-delay: 1s, 0s;
    }
    .snowflake:nth-of-type(9) {
      left: 90%;
      -webkit-animation-delay: 3s, 1.5s;
      animation-delay: 3s, 1.5s;
    }
  }
  .features {
    background: #33363a;
    .features-container {
      width: calc(100% - 50px);
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 0;
      color: white;
      text-align: left;
    }
    .vibesbot {
      font-weight: 600px;
      font-size: 20px;
      padding-bottom: 20px;
    }
    .a-powerful {
      font-size: 45px;
      font-weight: 800;
      line-height: 1.1em;
      width: 760px;
      max-width: 100%;
      padding-bottom: 40px;
    }
    .items {
      display: flex;
      flex-wrap: wrap;
      @media (min-width: 600px) {
        margin: -50px;
      }
    }
    .item {
      flex-basis: 400px;
      box-sizing: border-box;
      padding: 50px;
      .icon {
        width: 135px;
      }
      .title {
        padding-top: 20px;
        line-height: 3em;
        font-weight: 700;
        font-size: 20px;
      }
      .text {
        color: white;
        font-size: 17px;
        opacity: 0.6;
        letter-spacing: 0.02em;
        line-height: 1.3em;
      }
    }
  }
  .communities {
    background: #33363a;
    padding: 60px;
  }
  .give-vibes-a-try {
    padding-top: 50px;
    a {
      text-decoration: none;
    }
    text-align: center;
    img {
      height: 150px;
      display: inline-block;
    }
    div {
      padding-top: 20px;
      font-weight: 800;
      font-size: 38px;
    }
  }
  .footer {
    .page-container {
      display: flex;
      flex-direction: row;
      margin: 50px auto;
      max-width: calc(100% - 20px);
      flex-wrap: wrap;
    }
    .logo {
      flex-grow: 1;
      @media (min-width: 600px) {
        flex-grow: 0;
        justify-content: start;
      }
      text-align: left;
      flex-basis: 50%;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      img.icon {
        width: 1em;
        height: 1em;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .link-lists {
      display: flex;
      align-items: end;
      flex-grow: 1;
      justify-content: flex-start;
      align-items: flex-start;
      @media (min-width: 600px) {
        flex-grow: 0;
        justify-content: flex-end;
      }
      flex-basis: 50%;
      .link-list {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 20px;
        font-size: 16px;
        p {
          font-weight: 600;
          padding-bottom: 10px;
        }
        a {
          padding-bottom: 10px;
        }
      }
    }
  }
`;
