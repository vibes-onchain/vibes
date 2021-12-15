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

export default function () {
  return (
    <div css={CSS}>
      <Header />
      <div className="hero">
        {/* <img className="cover-wave" src={wave_gradient} alt="cover" /> */}
        <div className="hero-container">
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
                members for being cool with a vibenomic policy set by you od
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
              <p>📖 Docs</p>
              <a href="https://github.com/spot-foundation/vibes">Github</a>
              <a href="https://discord.gg/Ccae6XpDBV">Support Server</a>
            </div>
            <div className="link-list">
              <p>🌎 Connect</p>
              <a href="https://twitter.com/vibesbotgg">Twitter</a>
              <a href="https://discord.gg/Ccae6XpDBV">Discord</a>
            </div>
            <div className="link-list">
              <p>💻 Company</p>
              <a href="/">Terms of Use</a>
              <a href="/">Privacy Policy</a>
            </div>
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
    padding-top: 5rem !important;
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
      padding-top: 20px;
      font-weight: 300;
      font-size: 24px;
      line-height: 1.4em;
      padding-bottom: 20px;
    }
    .button {
      margin-top: 20px;
      background: #33363b;
      padding: 15px 20px;
      border-radius: 8px;
      font-size: 18px;
      color: white;
    }
  }
  .features {
    background: #33363b;
    .features-container {
      width: calc(100% - 20px);
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
      font-size: 40px;
      font-weight: 800;
      line-height: 1.1em;
      width: 700px;
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
        width: 150px;
      }
      .title {
        padding-top: 20px;
        font-weight: bold;
        font-size: 18px;
      }
      .text {
        color: #afb2b6;
        font-size: 16px;
      }
    }
  }
  .communities {
    background: #33363b;
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
      width: 850px;
      max-width: calc(100% - 20px);
      flex-wrap: wrap;
    }
    .logo {
      flex-grow: 1;
      @media (min-width: 600px) {
        flex-grow: 0;
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
        font-size: 14px;
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
