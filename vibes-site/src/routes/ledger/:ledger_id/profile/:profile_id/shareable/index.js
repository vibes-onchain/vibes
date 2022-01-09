/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Backend from ":/lib/Backend";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import useRouter from ":/lib/useRouter";
import Loading from ":/components/Loading";
import EntryId from ":/lib/EntryId";
import Ledger from "spothub/lib/Ledger";
import LedgerEntry from "spothub/lib/LedgerEntry";

export default function () {
  const router = useRouter();
  const ledger_id = router.match.params.ledger_id;
  const profile_id = router.match.params.profile_id;
  const [ledger, setLedger] = React.useState(null);
  const [ledgerEntries, setLedgerEntries] = React.useState(null);

  React.useEffect(() => {
    if (ledger_id) {
      Ledger.findOne({ where: { id: ledger_id } }).then((r) => {
        setLedger(r);
      });
    }
  }, [ledger_id]);

  React.useEffect(() => {
    LedgerEntry.findAll({ where: { ledger_id } }).then((r) => {
      setLedgerEntries(r);
    });
  }, [ledger_id]);

  if (!ledger || !ledgerEntries) {
    return <Loading />;
  }

  return (
    <>
      <Global
        styles={css`
          body {
            background: transparent !important;
          }
        `}
      />
      <div css={CSS} id="shareable" className="canBeRendered">
        User {profile_id}
      </div>
    </>
  );
}

const CSS = css`
  display: inline-block;
`;
