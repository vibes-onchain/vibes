/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// eslint-disable-next-line
import React from "react";
import {Link} from 'react-router-dom';

export default function Error404() {
  return (
    <div className="" css={CSS}>
      <div>Content Not Found</div>
      <div><Link to={'/'}>Go Home</Link></div>
    </div>
  );
}

const CSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  flex-direction: column;
  > div { padding: 10px 0; }
`;
