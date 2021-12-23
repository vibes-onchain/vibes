/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Icon, Dropdown, Label } from "semantic-ui-react";
// eslint-disable-next-line
import React from "react";

import vibeslogo from ":/assets/img/vibes-logo.png";

export default function Header(props) {
  let homeURL = props.homeURL ? props.homeURL : "/";
  let portal = props.portal ? props.portal : "";
  let username = props.username ? props.username : "Account";

  let history = useHistory();

  const trigger = (
    <span>
      <Icon name="user" />{" "}
      <span
        style={{
          maxWidth: "40em",
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {username}
      </span>
    </span>
  );

  const options = [
    { key: "help", text: "Help", icon: "help" },
    {
      key: "sign-out",
      text: (
        <Link
          to={"/logout"}
          style={{ textDecoration: "none", color: "rgba(0,0,0,.95)" }}
        >
          Logout
        </Link>
      ),
      icon: "sign out",
    },
  ];

  const logout = () => {
    history.push(`/logout`);
  };

  const editProfile = () => {
    history.push(`/profile/edit_profile`);
  };

  return (
    <div css={headerCSS}>
      <div className="navbar">
        <div className="page-width-container">
          <div className="left">
            <Link to={"/"}>
              <img className="text" src={vibeslogo} alt="vibes" />
            </Link>
          </div>
          <div className="right">
            <a className="item" href={process.env.REACT_APP_VIBES_DOCS_URL}>📖 Docs</a>
            <a className="item" href={'https://discord.gg/Ccae6XpDBV'}>💬 Chat with us</a>
            <a className="item" href={process.env.REACT_APP_DISCORD_BOT_URL}>🤖 Build your bot ➝</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const headerCSS = css`
  margin: 0px auto;
  text-align: center;
  width: 100%;
  span.bold {
    font-weight: bold;
  }
  span.tooltip-trigger {
    cursor: help;
  }
  .noDecoration {
    text-decoration: "none";
    color: white;
  }
  .navbar {
    .page-width-container {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      flex-direction: row;
      @media (min-width: 600px) {
        flex-direction: row;
      }
      .left {
        flex-basis: 300px;
        flex-grow: 0;
        flex-shrink: 1;
      }
      .left a {
        display: flex;
        align-items: center;
        padding: 15px 0;
        img {
          margin-right: 5px;
          height: 50px;
        }
        font-size: 28px;
        font-weight: 800;
        color: #0f0f0f;
      }
      .right {
        display: none;
        align-items: right;
        justify-content: space-between;
        flex-basis: 600px;
        @media (min-width: 600px) {
          display: flex;
        }
      }
      .right a {
        font-size: 17px;
        font-weight: 600;
        padding: 0 30px;
        color: #0f0f0f;
        display: flex;
        align-items: center;
        border-radius: none;
        flex-grow: 1;
        text-align: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
`;
