import React from 'react';
import BackendContext from ":/contexts/BackendContext";

export default function () {
  const beContext = React.useContext(BackendContext);

  React.useLayoutEffect(() => {
    if (!beContext.sessionData) {
      beContext.getSessionData(() => {});
    }
  });

  return beContext.sessionData;
}