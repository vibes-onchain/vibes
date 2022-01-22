/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React from "react";
import EntryId from ":/lib/EntryId";
import LedgerEntryUserLabel from ":/components/LedgerEntryUserLabel";
import moment from "moment";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import _ from "lodash";

export default function LedgerTable({ ledger_id, ledgerEntries }) {
  const data = React.useMemo(() => {
    const r = ledgerEntries
      .reverse()
      .map((i) =>
        _.pick(i, ["id", "authored_on", "type", "sender", "receiver", "value"])
      );
    return r;
  }, [ledgerEntries]);

  const columns = React.useMemo(() => [
    {
      Header: "Entry ID",
      accessor: "id",
      Cell: ({ value }) => <>{EntryId.abbreviate(value)}</>,
    },
    {
      Header: "Time",
      accessor: "authored_on",
      Cell: ({ value }) => (
        <>{value && moment(value).format("YYYY-MM-DD k:mm")}</>
      ),
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Sender",
      accessor: "sender.id",
      Cell: ({ row: { original: entry }, value }) => (
        <>
          {entry?.sender && (
            <LedgerEntryUserLabel
              to={`/ledger/${ledger_id}/profile/discord_member-${entry.sender?.id}`}
              id={entry.sender?.id}
              imgClassName={"w-7 h-7 rounded-full inline-block"}
            />
          )}
        </>
      ),
    },
    {
      Header: "Receiver",
      accessor: "receiver.id",
      Cell: ({ row: { original: entry }, value }) => (
        <>
          {entry?.receiver && (
            <LedgerEntryUserLabel
              to={`/ledger/${ledger_id}/profile/discord_member-${entry.receiver?.id}`}
              id={entry.receiver?.id}
              imgClassName={"w-7 h-7 rounded-full inline-block"}
            />
          )}
        </>
      ),
    },
    {
      Header: "Data",
      accessor: "value",
      Cell: ({ value }) => (
        <>{value?.vibe_rate || value?.vibe_period || value?.reason}</>
      ),
    },
  ]);

  const initialSortBy = React.useMemo(
    () => [{ id: "authored_on", desc: true }],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data,
        columns,
        initialState: {
          sortBy: initialSortBy,
        },
      },
      useFilters,
      useSortBy,
      usePagination,
    );

  return (
    <div css={CSS}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <tbody>
          {ledgerEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{EntryId.abbreviate(entry.id)}</td>
              <td>
                {entry.authored_on &&
                  moment(entry.authored_on).format("YYYY-MM-DD k:mm")}
              </td>
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
        </tbody> */}
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
