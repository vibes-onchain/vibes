/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React from "react";
import EntryId from ":/lib/EntryId";
import LedgerEntryUserLabel from ":/components/LedgerEntryUserLabel";
import moment from "moment";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import _ from "lodash";
import {matchSorter} from 'match-sorter'


function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

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
<<<<<<< HEAD
      //filter: 'fuzzyText',
=======
      filter: 'fuzzyText',
>>>>>>> d4434ae (slice of shown results + wip of filtering)
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
  ],[ledger_id]);

  const initialSortBy = React.useMemo(
    () => [{ id: "authored_on", desc: true }],
    []
  );
  
<<<<<<< HEAD
  /*const filterTypes = React.useMemo(
=======
  const filterTypes = React.useMemo(
>>>>>>> d4434ae (slice of shown results + wip of filtering)
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
<<<<<<< HEAD
  )*/
=======
  )
>>>>>>> d4434ae (slice of shown results + wip of filtering)


  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
<<<<<<< HEAD
=======

>>>>>>> d4434ae (slice of shown results + wip of filtering)


  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, /*rows,*/
    page, 
    prepareRow,
    canPreviousPage, 
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
   } =
    useTable(
      {
        data,
        columns,
        defaultColumn,
        initialState: {
          sortBy: initialSortBy,
          pageIndex: 0,
          pageSize: 50,
        },
<<<<<<< HEAD
        //filterTypes,
=======
        filterTypes,
>>>>>>> d4434ae (slice of shown results + wip of filtering)
      },
      useFilters,
      useSortBy,
      usePagination,
    );
  
<<<<<<< HEAD
  //const firstPageRows = rows.slice(0, 50)
  
=======
  const firstPageRows = rows.slice(0, 50)

>>>>>>> d4434ae (slice of shown results + wip of filtering)
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
<<<<<<< HEAD
          {page.map((row, i) => {
=======
          {firstPageRows.map((row, i) => {
>>>>>>> d4434ae (slice of shown results + wip of filtering)
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
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        {/*<select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[50, 100, 150, 200, 250].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>*/}
      </div>
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
