/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

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
import LedgerTable from ':/components/LedgerTable';

export default function () {
  const router = useRouter();
  const ledger_id = router.match.params.ledger_id;
  const profile_id = router.match.params.profile_id;
  const [ledger, setLedger] = React.useState(null);
  const [guildId, setGuildId] = React.useState(null);
  const [ledgerEntries, setLedgerEntries] = React.useState(null);
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    if (ledger_id) {
      Ledger.findOne({ where: { id: ledger_id } }).then((r) => {
        setLedger(r);
      });
    }
  }, [ledger_id]);

  React.useEffect(() => {
    const discord_member_id = profile_id.split("discord_member-")[1];
    LedgerEntry.findAll({ where: { ledger_id } }).then((r) => {
      const r2 = r.filter(
        (entry) =>
          entry.sender?.id === discord_member_id ||
          entry.receiver?.id === discord_member_id
      );
      setLedgerEntries(r2);
    });
  }, [ledger_id, profile_id]);

  React.useEffect(() => {
    if (profile_id.match("discord_member-")) {
      const discord_member_id = profile_id.split("discord_member-")[1];
      Backend.get(`/discord/user/${discord_member_id}`).then((r) => {
        setProfile({
          username: r.result?.user?.username,
          displayAvatarURL: r.result?.user?.displayAvatarURL,
        });
      });
    }
  }, [guildId, profile_id]);

  if (!ledger || !ledgerEntries) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div css={CSS}>
          <h1>
            {ledger.name}
            <img src={profile?.displayAvatarURL} />
            <span>@{profile?.username}</span>
          </h1>
          <LedgerTable ledger_id={ledger_id} ledgerEntries={ledgerEntries} /> 
        </div>
      </div>
      <Footer />
    </>
  );
}

const CSS = css`
  table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  th,
  td {
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  th {
    text-align: left;
  }

  thead {
    th {
      background-color: #55608f;
    }
  }

  tbody {
    background: linear-gradient(45deg, #49a09d, #5f2c82);

    tr {
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    td {
      position: relative;
      &:hover {
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -9999px;
          bottom: -9999px;
          background-color: rgba(255, 255, 255, 0.2);
          z-index: -1;
        }
      }
    }
  }
`;
