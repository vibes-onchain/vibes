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
import LedgerEntryUserLabel from ":/components/LedgerEntryUserLabel";

export default function () {
  const router = useRouter();
  const ledger_id = router.match.params.ledger_id;
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
      <Header />
      <div className="page-container">
        <div css={CSS}>
          <h1>{ledger.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Entry ID</th>
                <th>Time</th>
                <th>Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry) => (
                <tr>
                  <td>{EntryId.abbreviate(entry.id)}</td>
                  <td>{entry.authored_on}</td>
                  <td>{entry.type}</td>
                  <td>
                    {entry.sender && (
                      <LedgerEntryUserLabel
                        to={`/ledger/${ledger_id}/profile/discord_member-${entry.sender?.id}`}
                        id={entry.sender?.id}
                        imgClassName={"w-7 h-7 rounded-full inline-block"}
                      />
                    )}
                  </td>
                  <td>
                    {entry.receiver && (
                      <LedgerEntryUserLabel
                        to={`/ledger/${ledger_id}/profile/discord_member-${entry.receiver?.id}`}
                        id={entry.receiver?.id}
                        imgClassName={"w-7 h-7 rounded-full inline-block"}
                      />
                    )}
                  </td>
                  <td>
                    {entry.value?.vibe_rate ||
                      entry.value?.vibe_period ||
                      entry.value?.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
