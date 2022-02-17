/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import { responsiveSize } from ":/lib/CssHelpers";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useWindowWidth } from "@react-hook/window-size";

import hero_bg from ":/assets/img/homepage/hero-bg.png";
import hero_gradient from ":/assets/img/homepage/hero-gradient.jpg";
import vao1_img from ":/assets/img/homepage/vao-1.png";
import vao1pg_img from ":/assets/img/homepage/vao-1-pg.png";

import feature1_img from ":/assets/img/homepage/1.gif";
import feature2_img from ":/assets/img/homepage/2.gif";
import feature3_img from ":/assets/img/homepage/3.gif";
import feature4_img from ":/assets/img/homepage/4.gif";

// featured communities
import pg_card from ":/assets/img/homepage/peaceful-groupies-card.png";
import rare_bunni_card from ":/assets/img/homepage/rare-bunni-card.png";
import monsterbuds_card from ":/assets/img/homepage/monsterbuds-card.png";
import kaddex_card from ":/assets/img/homepage/kaddex-card.png";

import vibenomics from ":/assets/img/vibenomics.png";
import demod from ":/assets/img/demod.png";
import integrations from ":/assets/img/integrations.png";
import vibecheck from ":/assets/img/vibecheck.png";
import vibesribbon from ":/assets/img/vibes-ribbon.png";
import vibesicon from ":/assets/img/vibes-hand.png";

import pixel_png from ":/assets/img/pixel.png";

import TextTransition, { presets } from "react-text-transition";

import Tilt from "react-parallax-tilt";

const WHATS = [
  "Decentralization",
  "Your DAO",
  "Your Whitelist",
  "Moderation",
  "Verification",
  "Governance",
  "Discord",
];

export default function () {
  const windowWidth = useWindowWidth();
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
              Vibesbot unlocks onchain vibe signals for NFT, crypto, and web3
              communities.
            </div>
            <div className="ctas">
              <a
                href={process.env.REACT_APP_DISCORD_BOT_URL}
                className="button rainbow-button"
              >
                <div className="shadow"></div>
                <div className="text">🤙 Add to Discord ✨</div>
              </a>
              <a className="read-setup" href="/docs">
                Setup Checklist →
              </a>
            </div>
          </div>
          <div className="image-part">
            <div className="first-vao">
              <Tilt tiltEnable={true} scale={1.05} transitionSpeed={2500}><img src={vao1_img} /></Tilt>
            </div>
          </div>
        </div>
      </div>
      <div className="featured-communities">
        <div className="communities-with">
          <span className="desktop-only">✨</span> Communities with{" "}
          <span className="mobile-only">
            <br /> ✨
          </span>{" "}
          Good Vibes ✨
        </div>
        <div className="communities">
          <Swiper
            slidesPerView={windowWidth > 1200 ? 4 : 2.25}
            centeredSlides={true}
            spaceBetween={30}
            loop={windowWidth > 1200 ? true : true}
            loopFillGroupWithBlank={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="community">
                <div className="image">
                  <Tilt>
                    <img src={pg_card} />
                  </Tilt>
                </div>
                <div className="name">Peaceful Groupies</div>
                <div className="link">
                  <Link
                    to={`/ledger/e9b405c56ee449c08030bae7672f1523dabdcf1693ab14b7c30202a7cd90099f`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="community">
                <div className="image">
                  <Tilt><img src={rare_bunni_card} /></Tilt>
                </div>
                <div className="name">Rare Bunni Club</div>
                <div className="link">
                  <Link
                    to={`/ledger/3bfc1525c9a841336e5b1aa2fa01d1c69cf4d6d986ad9196499b87e061a4b6ec`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="community">
                <div className="image">
                  <Tilt><img src={monsterbuds_card} /></Tilt>
                </div>
                <div className="name">Monsterbuds</div>
                <div className="link">
                  <Link
                    to={`/ledger/736682de98365d886397ec43ee2e2947889b7ae0855938335447d6e0b0ffe1bf`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="community">
                <div className="image">
                  <Tilt><img src={kaddex_card} /></Tilt>
                </div>
                <div className="name">Kaddex</div>
                <div className="link">
                  <Link to={`/ledger/${1}`}>View</Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="features">
        <div className="features-container">
          <div className="items">
            <div className="item">
              <div className="copy">
                <div className="title">⚡</div>
                <div className="title">Boost your community's positivity</div>

                <div className="text">
                  Make it easy, fun, and rewarding to <strong>shout out</strong>{" "}
                  good !vibes. Come for the art, stay for the !vibes.
                </div>
              </div>
              <div className="image">
                <img src={feature1_img} />
              </div>
            </div>
            <div className="item">
              <div className="copy">
                <div className="title">🌱</div>
                <div className="title">Scale your culture</div>
                <div className="text">
                  Custom vibe commands, emoji reacts, and vibe levels let you
                  signal your culture. Establish and propagate your norms.
                </div>
              </div>
              <div className="image">
                <img src={feature2_img} />
              </div>
            </div>
            <div className="item">
              <div className="copy">
                <div className="title">🙅‍♀️</div>
                <div className="title">Community moderation: Scammers NGMI</div>
                <div className="text">
                  Giving many trusted members the tools to flag and timeout
                  suspicious actors lets{" "}
                  <strong>your community protect itself</strong> 24/7.
                </div>
              </div>
              <div className="image">
                <img src={feature3_img} />
              </div>
            </div>
            <div className="item">
              <div className="copy">
                <div className="title">⛓️</div>
                <div className="title">Onchain + cross platform</div>
                <div className="text">
                  Use Vibes on your Discord, Discourse, DAO proposal system, and
                  more. Your community's <strong>vibes are onchain</strong> and
                  go where you go.
                </div>
              </div>
              <div className="image">
                <img src={feature4_img} />
              </div>
            </div>
          </div>
        </div>
        <img src={vibesribbon} className="ribbon" />
      </div>
      <div className="vibey-features with-vibes-cursor">
        <div className="vibe-featues-container">
          <div className="title">Vibey Features</div>
          <div className="items">
            <div className="item">✦ send + receive vibes ✦</div>
            <div className="item">✦ vibenomics ✦</div>
            <div className="item">✦ vibechecks ✦</div>
            <div className="item">✦ display vibe levels ✦</div>
            <div className="item">✦ vibes leaderboard ✦</div>
            <div className="item">✦ vibes reactions ✦</div>
            <div className="item">✦ flag sus vibes ✦</div>
            <div className="item">✦ automatic timeouts ✦</div>
            <div className="item">✦ custom naming ✦</div>
            <div className="item">✦ custom reacts ✦</div>
            <div className="item">✦ dynamic display names ✦</div>
            <div className="item">✦ role management ✦</div>
          </div>
        </div>
      </div>
      <div className="spread-the">
        <div className="emojis">✨ ✨ ✨</div>
        <div className="title">Spread the good vibes around</div>
        <a className="button">Add Vibes to Discord →</a>
      </div>
      <Footer className="dark-theme" />
    </div>
  );
}

const CSS = css`
  position: relative;
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
      font-family: sharp_groteskbook_25, sans-serif;
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
        line-height: 1.4em;
        text-shadow: 0 0 0.2em rgb(255 255 255 / 95%);
      }
    }
    .caption {
      color: white;
      opacity: 78%;
      z-index: 1;
      text-align: left;
      padding-top: 20px;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.3em;
      padding-bottom: 20px;
      max-width: 352px;
      width: 98%;
      -webkit-font-smoothing: antialiased;
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
        padding: 20px 20px;
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

  .featured-communities {
    background: #1f2027;
    padding: 20px 0 37px 0;
    .communities-with {
      color: white;
      font-size: 28px;
      line-height: 1.2em;
      font-family: sharp_groteskbook_25, sans-serif;
      padding-bottom: 20px;
      padding-top: 20px;
      .desktop-only {
        display: none;
      }
      @media (min-width: 860px) {
        .desktop-only {
          display: initial;
        }
        .mobile-only {
          display: none;
        }
      }
    }
    .communities {
      .slick-track {
        display: flex;
      }
      .community {
        .image {
          width: 100%;
          max-width: 100%;
          text-align: center;
          img {
            display: inline-block;
            max-height: 400px;
          }
        }
        .name {
          font-family: 'sharp_groteskbook_25';
          color: white;
          font-size: 12px;
          line-height: 1.4em;
          @media (min-width: 450px) {
            font-size: 15px;
          }
          @media (min-width: 600px) {
            font-size: 15px;
          }
          line-height: 1.4em;
        }
        .link {
          margin-top: 16px;
          a {
            font-size: 13px;
            padding: 8px 8px;
            @media (min-width: 600px) {
              font-size: 14px;
              padding: 8px 8px;
            }
            text-transform: uppercase;
            font-family: 'sharp_groteskbook_25';
            opacity: .8;
            padding: 8px 8px;
            color: white;
            display: inline-block;
            width: calc(100% - 50px);
            max-width: 300px;
            border: 1px solid #fafafa;
            border-radius: 12px;
          }
        }
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
      padding: 20px 0;
      color: white;
      text-align: left;
    }
    .items {
      display: flex;
      flex-wrap: wrap;
      @media (min-width: 600px) {
        justify-content: space-evenly;
      }
    }
    .item {
      flex-basis: 400px;
      @media (min-width: 800px) {
        flex-basis: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        &:nth-child(2n+1) {
          .image {
            margin-left: 40px;
          }
        }
        &:nth-child(2n) {
          flex-direction: row-reverse;
          .image {
            margin-right: 40px;
          }
        }
        margin-bottom: 80px;
      }
      box-sizing: border-box;
      padding: 10px;
      .icon {
        width: 135px;
      }
      .title {
        font-family: sharp_groteskbook_25, sans-serif;
        line-height: 1.5em;
        font-weight: 700;
        font-size: 19px;
      }
      .text {
        color: white;
        padding-top: 20px;
        font-size: 17px;
        opacity: 0.6;
        letter-spacing: 0.02em;
        line-height: 1.3em;
      }
      .copy {
        @media (min-width: 800px) {
          width: 500px;
        }
      }
      .image {
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-around;
        img { width: 250px; }
        @media (min-width: 800px) {
          display: block;
          img { width: 225px; }
        }
      }
    }
    .ribbon {
      padding-bottom: 40px;
    }
  }

  .vibey-features {
    background: #33363a;
    position: relative;
    background-image: url(${hero_gradient});
    background-size: 100% 100%;
    position: relative;
    color: white;
    padding: 40px 0;
    .vibey-features-container {
      width: calc(100% - 50px);
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      color: white;
      text-align: left;
    }
    .title {
      font-family: sharp_groteskbook_25, sans-serif;
      line-height: 1.5em;
      font-weight: 700;
      font-size: 28px;
      padding-bottom: 20px;
    }
    .items {
      display: flex;
      flex-direction: column;
      @media (min-width: 600px) {
        justify-content: space-around;
      }
    }
    .item {
      font-family: sharp_groteskbook_25, sans-serif;
      padding: 10px 0;
      font-size: 14px;
    }
  }
  
  .spread-the {
    padding: 60px;
    background: #33363a;
    color: white;
    text-align: center;
    .emojis {
      line-height: 1.5em;
      font-weight: 700;
      font-size: 28px;
    }
    .title {
      font-family: sharp_groteskbook_25, sans-serif;
      line-height: 1.5em;
      font-weight: 700;
      font-size: 28px;
      padding-bottom: 20px;
    }
    .button {
      padding: 15px 20px;
      @media (min-width: 600px) {
        padding: 15px 60px;
      }
      border-radius: 8px;
      font-size: 18px;
      font-weight: 700;
      color: white;
      display: inline-block;
      background: linear-gradient(45deg, #00a0db, #9274c4, #e74cb1, #ff6c2a, #ff9522,#ffbd2b);
      color: white;
    }
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
