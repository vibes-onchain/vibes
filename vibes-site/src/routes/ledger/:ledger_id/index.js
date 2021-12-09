/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Backend from ":/lib/Backend";
import BackendContext from ":/contexts/BackendContext";
import { Popup, Button } from "semantic-ui-react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import useSession from ":/lib/useSession";
import useRouter from ":/lib/useRouter";
import Loading from ":/components/Loading";
import EntryId from ":/lib/EntryId";

export default function () {
  const session = useSession();
  const router = useRouter();
  const space_id = router.match.params.space_id;
  const [space, setSpace] = React.useState(null);
  const [spaceLedgerEntries, setSpaceLedgerEntries] = React.useState(null);

  React.useEffect(() => {
    Backend.get(`/spaces/${space_id}`).then((r) => {
      setSpace(r.data);
    });
  }, space_id);

  React.useEffect(() => {
    Backend.get(`/spaces/${space_id}/ledger_entries`).then((r) => {
      setSpaceLedgerEntries(r.data);
    });
  }, space_id);

  if (!space || !spaceLedgerEntries) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div css={CSS}>
          <h1>{space.name}</h1>
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
              {spaceLedgerEntries.map((entry) => (
                <tr>
                  <td>{EntryId.abbreviate(entry.id)}</td>
                  <td>{entry.authored_on}</td>
                  <td>{entry.type}</td>
                  <td>{entry.value?.by_user_id}</td>
                  <td>{entry.value?.user_id}</td>
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
