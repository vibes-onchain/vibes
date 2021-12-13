/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import wave_gradient from ":/assets/img/wave-gradient.png"

export default function () {
  return (
    <div css={CSS}>
      <Header />
      <div
      >
        <div className="upper-band">
          <img className="cover-wave" src={wave_gradient} alt="cover"/> 
          <div className="message header">
            On-chain trust for massive, open, decentralized communities
          </div>
          <div className="message">
            Bringing trust and reputation to web3 communities. Everyone has a vibe, what's yours?
          </div>
        </div>
        <div>
          VibesBot
        </div>
        <div>
          A powerful way to moderate and grow your web3 community
        </div>
        <div>
        <div className="item title">
          Vibenomics
        </div>
        <div className="item text">
          Not tokens, not XP. Vibes let your community socially recognize members for being cool with a vibenomic policy set by you od your DAO.
        </div>
        </div>
        <div>
        <div className="item title">
          Decentralized moderation
        </div>
        <div className="item text">
          Stop scammers without burning your mods out. Vibes give your community progressively decentralized moderation.
        </div>
        </div>
        <div>
        <div className="item title">
          Cross platform integrations
        </div>
        <div className="item text">
          Plug into your Discord, Telegram, Discourse, or custom app. Your community can take their vibes with them wherever they go. 
        </div>
        </div>
        <div>
        <div className="item title">
          Onchain vibechecks
        </div>
        <div className="item text">
          Vibes live as append only entries on your community's ledger. Vibechecks let you pull up historical interactions.
        </div>
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
  .upper-band{
    //display: flex; 
    //flex-direction: column;
    position: relative; 
    text-align: center; 

    .cover-wave{
      max-width: 100%;
      height: 70vh;
    }

    .message{
    
      position: absolute;
      
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 500; 
      font-size: 18px;

      &.header{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 22px;
        font-weight: bold; 
      }
    }
  }
  
`;