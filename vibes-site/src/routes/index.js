/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import wave_gradient from ":/assets/img/wave-gradient.png";

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
      <div>VibesBot</div>
      <div>A powerful way to moderate and grow your web3 community</div>
      <div>
        <div className="item title">Vibenomics</div>
        <div className="item text">
          Not tokens, not XP. Vibes let your community socially recognize
          members for being cool with a vibenomic policy set by you od your DAO.
        </div>
      </div>
      <div>
        <div className="item title">Decentralized moderation</div>
        <div className="item text">
          Stop scammers without burning your mods out. Vibes give your community
          progressively decentralized moderation.
        </div>
      </div>
      <div>
        <div className="item title">Cross platform integrations</div>
        <div className="item text">
          Plug into your Discord, Telegram, Discourse, or custom app. Your
          community can take their vibes with them wherever they go.
        </div>
      </div>
      <div>
        <div className="item title">Onchain vibechecks</div>
        <div className="item text">
          Vibes live as append only entries on your community's ledger.
          Vibechecks let you pull up historical interactions.
        </div>
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
    background-repeat: no-repeat;
    .hero-container {
      width: 100%;
      height: 800px;
      max-height: 80vw;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      align-content: center;
      flex-direction: column;
      justify-content: center;s
    }
    .h1 {
      top: 45%;
      font-size: 58px;
      font-weight: 800;
      width: 1080px;
      max-width: 90%;
      line-height: 1.1em;
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
`;
