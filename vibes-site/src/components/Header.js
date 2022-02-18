/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Button,
  Icon,
  Image,
  Dropdown,
  Label,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import BodyClassName from "react-body-classname";
// eslint-disable-next-line
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import vibes_logo_for_light_theme from ":/assets/img/homepage/vibes-logo-for-light-theme.png";
import vibes_logo_for_dark_theme from ":/assets/img/homepage/vibes-logo-for-dark-theme.png";
import ThemeContext from ":/contexts/ThemeContext";

export default function Header(props) {
  const themeContext = React.useContext(ThemeContext);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

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
    <div className={`Header ${props.className}`} css={headerCSS}>
      <div className="navbar">
        <div className="page-width-container">
          <div className="left">
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
          <div className="center desktop-only">
            <a className="item" href={process.env.REACT_APP_VIBES_DOCS_URL}>
              Docs
            </a>
            <a className="item" href={"/"}>
              Communities
            </a>
            <a className="item" href={"https://opensea.io/collection/genesis-vaos"}>
              VAO
            </a>
            <a className="item" href={process.env.REACT_APP_DISCORD_INVITE}>
              <FaDiscord className="icon" /> Chat with us
            </a>
            <div className="item">
              <div className="theme">
                <div className="option light">
                  <FiSun onClick={() => themeContext.setTheme("light")} />
                </div>
                <div className="option dark">
                  <FiMoon onClick={() => themeContext.setTheme("dark")} />
                </div>
              </div>
            </div>
          </div>

          <div className="right mobile-only">
            <div
              className="icon"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              <FiMenu />
            </div>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setSidebarVisible(false)}
              right={1}
              vertical={true}
              visible={sidebarVisible}
            >
              <a className="item" href={process.env.REACT_APP_VIBES_DOCS_URL}>
                Docs
              </a>
              <a className="item" href={"https://opensea.io/collection/genesis-vaos"}>
                VAO
              </a>
              <a className="item" href={process.env.REACT_APP_DISCORD_INVITE}>
                Chat with us
              </a>
              <a className="item" href={process.env.REACT_APP_DISCORD_BOT_URL}>
                Add VibesBot
              </a>
              <div className="item">
                <div className="theme">
                  <div className="option light">
                    <FiSun onClick={() => themeContext.setTheme("light")} />
                  </div>
                  <div className="option dark">
                    <FiMoon onClick={() => themeContext.setTheme("dark")} />
                  </div>
                </div>
              </div>
            </Sidebar>
          </div>
          <div className="right desktop-only">
            <a
              className="item button-holder"
              href={process.env.REACT_APP_DISCORD_BOT_URL}
            >
              <div className="button">Add to Discord</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const headerCSS = css`
  .pushable:not(body) {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }

  .pushable:not(body) > .ui.sidebar,
  .pushable:not(body) > .fixed,
  .pushable:not(body) > .pusher:after {
    position: fixed;
  }

  .ui.visible.left.overlay.sidebar,
  .ui.sidebar {
    font-family: 'sharp_groteskbook_25';
    background: #2f3136;
    width: 75%;
    box-shadow: 0px 0px 5px 4px #80808033;
  }

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
      @media (min-width: 860px) {
        flex-direction: row;
        > .left {
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 150px;
        }
        > .center {
          flex-grow: 1;
          display: flex;
          justify-content: center;
        }
        > .right {
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 150px;
        }
      }
    }
    .left a {
      display: flex;
      align-items: center;
      padding: 20px 0;
      img {
        margin-right: 5px;
        height: 21px;
        max-width: none;
      }
      font-size: 28px;
      font-weight: 700;
      color: white;
    }
    .right {
      align-items: right;
      justify-content: space-between;
      flex-basis: 600px;
      @media (min-width: 860px) {
        display: flex;
      }
    }
    .center > .item {
      font-size: 15px;
      font-weight: 700;
      padding: 0 20px;
      color: #0f0f0f;
      display: flex;
      align-items: center;
      border-radius: none;
      flex-grow: 0;
      text-align: center;
      justify-content: center;
      cursor: pointer;
      .icon {
        margin-right: 5px;
      }
      .theme {
        text-align: left;
        justify-content: left;
        background: #bebebe3b;
        border: 1px solid #f2f2f200;
        border-radius: 20px;
        padding: 2px;
        .option {
          display: inline-block;
          vertical-align: middle;
          padding: 5px 8px;
          &.light {
            color: black;
          }
          &.dark {
            color: #2f3136;
          }
        }
      }
    }
    .right > .item.button-holder {
      display: inline-flex;
      vertical-align: middle;
      margin: 5px 5px;
      font-size: 15px;
      font-weight: bold;
      align-content: flex-end;
      align-items: center;
      .button {
        border-radius: 15px;
        padding: 8px 18px;
        background: #bebebe3b;
      }
    }
  }
  .right.mobile-only {
    display: initial;
    text-align: right;
    .icon {
      text-align: right;
      display: inline-block;
      font-size: 30px;
      padding: 8px;
    }
    .ui.labeled.icon.menu .item {
      min-width: 6em;
      flex-direction: column;
      font-size: 20px;
      text-align: center;
      .theme {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        .option.dark {
          color: #777;
        }
      }
    }
  }
  .center.desktop-only,
  .right.desktop-only {
    display: none;
  }
  @media (min-width: 860px) {
    .center.desktop-only,
    .right.mobile-only {
      display: none;
    }
    .center.desktop-only,
    .right.desktop-only {
      display: flex;
    }
  }

  // dark-theme or override
  body.dark-theme &,
  &.dark-theme {
    .navbar {
      .center > .item,
      .right > .item,
      .center .ui.labeled.icon.menu .item,
      .right .ui.labeled.icon.menu .item {
        color: #f2f2f2;
      }
    }
  }
  // dark-theme only
  body.dark-theme & {
    .navbar {
      .center > .item,
      .right > .item {
        .theme {
          background: #2f3136;
          border: 1px solid #f2f2f2;
          padding: 2px;
        }
      }
      .center > .item,
      .right > .item,
      .center .ui.labeled.icon.menu .item,
      .right .ui.labeled.icon.menu .item {
        .theme {
          .option {
            &.light {
              color: #777;
            }
            &.dark {
              color: #f2f2f2;
            }
          }
        }
      }
    }
  }
`;
