/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import EntryId from ":/lib/EntryId";
import LedgerEntryUserLabel from ":/components/LedgerEntryUserLabel";
import moment from 'moment';


export default function LedgerTable({ ledger_id, ledgerEntries }) {
  
  ledgerEntries.sort((a,b)=> (a.authored_on < b.authored_on) ? 1 : ((b.authored_on < a.authored_on) ? -1 : 0));

  return (
    <div css={CSS}>
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
            <tr key={entry.id}>
              <td>{EntryId.abbreviate(entry.id)}</td>
              <td>{entry.authored_on && moment(entry.authored_on).format('YYYY-MM-DD k:mm')}</td>
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
