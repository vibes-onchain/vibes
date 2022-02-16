/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import { responsiveSize } from ":/lib/CssHelpers";

import hero_bg from ":/assets/img/homepage/hero-bg.png";
import hero_gradient from ":/assets/img/homepage/hero-gradient.jpg";
import vao1_img from ":/assets/img/homepage/vao-1.png";
import vao1pg_img from ":/assets/img/homepage/vao-1-pg.png";

import vibenomics from ":/assets/img/vibenomics.png";
import demod from ":/assets/img/demod.png";
import integrations from ":/assets/img/integrations.png";
import vibecheck from ":/assets/img/vibecheck.png";
import vibesribbon from ":/assets/img/vibes-ribbon.png";
import vibesicon from ":/assets/img/vibes-hand.png";

import TextTransition, { presets } from "react-text-transition";

const WHATS = [
  "Decentralization",
  "Your DAO",
  "Your Whitelist",
  "Moderation",
  "Governance",
  "Discord",
];

export default function () {
  const [whatIndex, setWhatIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setWhatIndex((index) => index + (1 % WHATS.length)),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      const els = document.getElementsByClassName("with-vibes-cursor");
      for (const element of els) {
        window.vibesCursor?.({ element });
      }
    }, 1500);
  }, []);

  return (
    <div css={CSS}>
      <Header className={"dark-theme"} />
      <div className="hero with-vibes-cursor">
        {/* <img className="cover-wave" src={wave_gradient} alt="cover" /> */}
        <div className="hero-container">
          <div className="text-part">
            <div className="h1">
              <span className="what">
                {" "}
                <TextTransition
                  text={WHATS[whatIndex % WHATS.length]}
                  springConfig={presets.default}
                />
              </span>
              <span className="is-better"> is better with vibes</span>
            </div>
            <div className="caption">
              VibesBot unlocks onchain vibe signals in your NFT, crypto, and
              web3 community.
            </div>
            <div className="ctas">
              <a
                href={process.env.REACT_APP_DISCORD_BOT_URL}
                className="button rainbow-button"
              >
                <div className="shadow"></div>
                <div className="text">
                  🤙 Add to Discord &nbsp;&nbsp;&nbsp;✨
                </div>
              </a>
              <a className="read-setup" href="/docs">
                Read Setup Checklist →
              </a>
            </div>
          </div>
          <div className="image-part">
            <div className="first-vao">
              <img src={vao1_img} />
            </div>
          </div>
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

  .Header {
    position: absolute;
    z-index: 10;
  }

  .hero {
    display: block;
    box-sizing: border-box;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    background-image: url(${hero_bg});
    background-size: 100% 100%;
    background-position: center bottom;
    .hero-container {
      margin: 0 auto;
      padding-top: 80px;
      width: 1200px;
      max-width: calc(100% - 40px);
      @media (min-width: 600px) {
        max-width: calc(100% - 80px);
      }
      /* height: 700px; */
      /* max-height: 80vh; */
      position: relative;
      z-index: 1;
      display: flex;
      align-items: flex-start;
      align-content: center;
      flex-direction: column;
      justify-content: center;
      > .text-part {
        max-width: 100%;
      }
      > .image-part {
        max-width: 100%;
      }
      @media (min-width: 860px) {
        flex-direction: row;
        align-items: center;
        > .text-part {
          flex-basis: 50%;
          width: 50%;
        }
        > .image-part {
          flex-basis: 50%;
          width: 50%;
        }
      }
    }
    .h1 {
      color: white;
      font-family: sharp_groteskbook_25, sans;
      z-index: 1;
      font-size: 27px;
      font-size: ${responsiveSize({
        min: "27px",
        max: "40px",
        min_device_width: "390px",
        max_device_width: "1200px",
      })};
      width: 1080px;
      max-width: 100%;
      line-height: 1.1em;
      text-align: left;
      font-weight: 600;
      .what {
        line-height: 1.6em;
        text-shadow: 0 0 12px #fff;
      }
    }
    .caption {
      color: white;
      z-index: 1;
      text-align: left;
      padding-top: 20px;
      font-weight: 500;
      font-size: 21px;
      line-height: 1.3em;
      padding-bottom: 20px;
      width: 465px;
      max-width: 100%;
    }
    .button {
      z-index: 1;
      position: relative;
      .text {
        background: #33363a;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 700;
        color: white;
      }
      .shadow {
        position: absolute;
        top: 3px;
        right: -3px;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        content: ' ';
        z-index: -1;
        background: linear-gradient(90deg, #00a0db, #9274c4, #e74cb1, #ff6c2a, #ff9522,#ffbd2b);
      }
    }
    .read-setup {
      color: white;
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
      z-index: 1;
      padding: 20px 0;
      @media (min-width: 600px) {
        padding: 20px 40px;
      }
    }
    .ctas {
      margin-top: 28px;
      display: flex;
      flex-direction: column;
      @media (min-width: 600px) {
        flex-direction: row;
        align-items: center;
      }
    }
  }
  .features {
    background: #33363a;
    position: relative;
    .features-container {
      width: calc(100% - 50px);
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 0;
      color: white;
      text-align: left;
    }
    .vibesbot {
      font-weight: 600;
      font-size: 18px;
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
      line-height: 1.1em;
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



  body:not(.dark-theme) &,
  body.dark-theme & {
    .Header,
    .Header .navbar .center > .item {
      color: #f2f2f2;
    }
    .light-theme-only {
      display: none;
    }
    .dark-theme-only {
      display: block;
    }
  }
  body:not(.dark-theme) &
  .Header .navbar .center > .item .theme .option.light {
      color: #f2f2f2;
    }
    .Header .navbar .center > .item .theme .option.dark {
      color: #eeeeee33;
    }
  }
  body.dark-theme & {
    h1 {
      color: white;
    }
    .Header .navbar .center > .item .theme .option.light {
      color: #eeeeee33;
    }
    .Header .navbar .center > .item .theme .option.dark {
      color: #f2f2f2;
    }
  }
`;
