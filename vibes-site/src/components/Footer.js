/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

import React from "react";
import { Link } from "react-router-dom";

import vibesicon from ":/assets/img/vibes-hand.png";
import vibes_logo_for_light_theme from ":/assets/img/homepage/vibes-logo-for-light-theme.png";
import vibes_logo_for_dark_theme from ":/assets/img/homepage/vibes-logo-for-dark-theme.png";

import { FaDiscord } from "react-icons/fa";

export default function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <div className={`Footer ${props.className}`} css={CSS}>
      <div className="page-container">
        <div className="sides">
          <div className="left">
            <div className="logo">
              <Link to={"/"}>
                <img
                  className="light-theme-only text"
                  src={vibes_logo_for_light_theme}
                  alt="vibes"
                />
                <img
                  className="dark-theme-only text"
                  src={vibes_logo_for_dark_theme}
                  alt="vibes"
                />
              </Link>
            </div>
            <div className="about">
              We build tools that help web3 communities grow healthily and
              community members recognize others for being kind, helpful, and
              trustworthy.
            </div>
          </div>
          <div className="right">
            <div className="links">
              <a href={process.env.REACT_APP_DISCORD_INVITE}>
                {" "}
                <FaDiscord className="icon" /> Chat with us
              </a>
              <a href="/docs">Docs</a>
              <a href="/">Communities</a>
              <a href="/">VAO</a>
              <a href="https://twitter.com/vibesonchain">Twitter</a>
            </div>
          </div>
        </div>
        <div className="built-with">
          Built with 💖 and good vibes by
          <br /> a decentralized team
        </div>
      </div>
    </div>
  );
}

const CSS = css`
  .page-container {
  }
  .left {
    width: 300px;
    margin: 0 auto;
  }
  .built-with {
    text-align: center;
  }
  @media (min-width: 600px) {
    .sides {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 800px;
      max-width: 100%;
      margin: 0px auto;
      margin-bottom: 30px;
    }
    flex-wrap: wrap;
    .left {
      width: auto;
      margin: 0;
      -flex-basis: 50%;
    }
    .right {
      -flex-basis: 50%;
    }
    .built-with {
      flex-basis: 100%;
    }
  }
  .logo {
    width: 100px;
  }
  .about {
    text-align: left;
    padding: 20px 0;
    line-height: 1.2em;
    max-width: 200px;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
  .links {
    a {
      background: #bebebe3b;
      width: 300px;
      max-width: 100%;
      display: block;
      margin: 10px auto;
      padding: 16px 20px;
      border-radius: 20px;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  // dark-theme or override
  body.dark-theme &,
  &.dark-theme {
    color: white;
    background: #1f2027;
    .links {
      a {
        color: white;
      }
    }
    .about {
      color: #ccc;
    }
    .built-with {
      color: gray;
    }
  }
`;
