import React from "react";
import { Link } from "react-router-dom";

import LedgerEntryUserAvatar from "./LedgerEntryUserAvatar";
import LedgerEntryUserName from "./LedgerEntryUserName";

export default function LedgerEntryUserLabel({ type, id, to, imgClassName }) {
  if (to) {
    return (
      <Link to={to}>
        {" "}
        <span className="space-x-2">
          <LedgerEntryUserAvatar
            id={id}
            imgClassName={imgClassName || "rounded-full inline-block w-10"}
          />{" "}
          <LedgerEntryUserName id={id} />
        </span>
      </Link>
    );
  } else {
    return (
      <span className="space-x-2">
        <LedgerEntryUserAvatar
          id={id}
          imgClassName={imgClassName || "rounded-full inline-block w-10"}
        />{" "}
        <LedgerEntryUserName id={id} />
      </span>
    );
  }
}
