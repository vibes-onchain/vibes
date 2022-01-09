/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React, { useContex, useState } from "react";
import { Link } from "react-router-dom";
import Backend from ":/lib/Backend";
import BackendContext from ":/contexts/BackendContext";
// import { Popup, Button } from "semantic-ui-react";
import Header from ":/components/Header";
import Footer from ":/components/Footer";
import useSession from ":/lib/useSession";
import useRouter from ":/lib/useRouter";
import Loading from ":/components/Loading";
import EntryId from ":/lib/EntryId";
import { TextField, Button } from "@material-ui/core";
import { updateExpression } from "@babel/types";


import kaddex from ":/assets/img/kaddex.png"
import smiley from ":/assets/img/smiley.png"
import rare from ":/assets/img/rare.png"
import og from ":/assets/img/og.png"
import legendary from ":/assets/img/legendary.png"


export default function () {
  //const session = useSession();
  const router = useRouter();
  const community_id = router.match.params.profile_id;

  /*React.useEffect(() => {
    if (!beContext.profileData[profile_id]) {
      beContext.getProfileData(profile_id);
    }
  }, [profile_id, beContext]);*/

  //if (!beContext.profileData[profile_id]) {
    //return <Loading />;
  //}

  //const profile = beContext.profileData[profile_id];
/*Distinguish between private and community profiles */
/*if (profile.user.is_trainer) {
    return <TrainerProfile profile={profile} />;
  } else {
    return <UserProfile profile={profile} />
  }
*/
  return (
    <>
      <Header />
      <div css={CSS} className="page-container">
        <div className="cover">
          Kaddex Official 
        </div>
        <div className="main">
          <div className="body">
            <div className="links"> 
              <Link className="link active" to={`/community/leaderboard`}>
                Leaderboard
              </Link>
              <Link className="link" to={`/community/vibescan`}>
                Vibescan
              </Link>
              <Link className="link" to={`/community/vibenomics`}>
                Vibenomics
              </Link>
            </div>
            <div className="leaderboard">
            <h1 className="h1">
              Posts with good vibes
            </h1>

            <div className="posts">
              <div className="post">
                <div className="post header">
                  <img src={smiley} className="post avatar"/>
                  <div className="post time">
                    Jan 2 at 10:24AM
                  </div>
                </div>
                Some post about Kaddex and Kadena with epic legendary good vibes
              </div>
              
              <div className="post">
                <div className="post header">
                  <img src={smiley} className="post avatar"/>
                  <div className="post time">
                    Jan 2 at 10:24AM
                  </div>
                </div>
                XWallet is launched in beta! The devs pushed hard to get this out for Q1 2022 and here we are. Go try it out y'all
              </div>  

            </div>
          </div>
          </div>
          <div className="feature">
            Get your community leaderboard
          </div>      
        </div>
      </div>
    </>
  );
}


const CSS = css`
display: block; 
padding: 0;
.cover{
  background-image: url(${kaddex});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 36vh;
  font-weight: 600;
  font-size: xx-large; 
  color: white;
  text-align:
}


.main{
  display: flex;
  flex-direction: row;

  .feature{
    background: black;
    margin: 25px;
    margin-left: 10px;
    color: white; 
    font-size: 25px; 
    font-weight: bold;
    padding: 20px;
    width: 400px;
    background-image: url(${rare}), url(${legendary}), url(${og});
    background-repeat: space;
    background-position: 50px 0px;
    background-size: 35px;
    //background:  linear-gradient(90deg, rgba(254,62,8,1) 0%, rgba(255,158,0,1) 11%, rgba(255,231,0,1) 22%, rgba(139,255,0,1) 33%, rgba(11,252,97,1) 44%, rgba(13,182,247,1) 55%, rgba(10,246,246,1) 66%, rgba(6,21,247,1) 77%, rgba(237,0,255,1) 88%, rgba(237,0,255,1) 100%);
    border-radius: 3px; 

  } 
}
.body{
  display: flex;
  flex-direction: column;
}
.links{
  margin: 0 10px;
  margin-top: 10px; 

  .link{
    //margin: 10px; 
    color: gray;
    padding: 0 10px;
    font-size: 25px;

    &.active{
      color: black;
      text-decoration: underline;
      font-weight: bold
    }  
  }
}

.h1{
  font-size: 25px;
  font-weight: 800;
  width: 1080px;
  max-width: 90%;
  line-height: 1.1em;
  margin: 10px;
}

.posts{
  display: flex; 
  flex-direction: row;
  .post{
    margin: 10px;
    width: 400px;
    border-color: #d4d4d5; 
    border-width: thin; 
    padding-left: 10px;
    &.header{
      display: flex; 
      border-width: 0;
      flex-direction: row;
      padding-left: 0px;
    }
    &.avatar{
      border-width: 0;
      margin: 0;
      width: 10%;
      padding-left: 0px;
    }
    &.time{
      margin-left: 200px;
      margin-right: 0px;
      border-width: 0;
      padding-left: 0px;
    }
  }
  

}
`