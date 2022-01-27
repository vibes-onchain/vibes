/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React from "react";
import EntryId from ":/lib/EntryId";
import LedgerEntryUserLabel from ":/components/LedgerEntryUserLabel";
import moment from "moment";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useFlexLayout,
} from "react-table";
import { useWindowWidth } from "@react-hook/window-size";
import _ from "lodash";
import { matchSorter } from "match-sorter";
import { BiLinkExternal } from "react-icons/bi";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

export default function LedgerTable({ ledger_id, ledgerEntries }) {
  const windowWidth = useWindowWidth();
  const data = React.useMemo(() => {
    const r = ledgerEntries
      .reverse()
      .map((i) =>
        _.pick(i, ["id", "authored_on", "type", "sender", "receiver", "value"])
      );
    return r;
  }, [ledgerEntries]);

  const columns = React.useMemo(
    () => [
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
        //filter: 'fuzzyText',
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
        Cell: ({ value }) =>
          value?.note_url ? (
            <a href={value.note_url} target={"_blank"} rel={"noreferrer"}>
              <BiLinkExternal />
            </a>
          ) : (
            <>{value?.vibe_rate || value?.vibe_period || value?.reason}</>
          ),
      },
    ],
    [ledger_id]
  );

  const initialSortBy = React.useMemo(
    () => [{ id: "authored_on", desc: true }],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const useTableStuff = React.useMemo(() => {
    const r = [useFilters, useSortBy, usePagination];
    if (windowWidth > 800) {
      r.push(useFlexLayout);
    }
    return r;
  }, [windowWidth]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups /*rows,*/,
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
  } = useTable(
    {
      data,
      columns,
      defaultColumn,
      initialState: {
        sortBy: initialSortBy,
        pageIndex: 0,
        pageSize: 50,
      },
      //filterTypes,
    },
    ...useTableStuff
  );

  const headerGroup = headerGroups?.[0];

  return (
    <div css={CSS}>
      <div className="table responsiveTable" {...getTableProps()}>
        <div className="thead">
          <div className="tr" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <div
                className="th"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="tbody" {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <div className="tr" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <div className="td" {...cell.getCellProps()}>
                      <>
                        <div className="tdHeader">{cell?.column?.Header}</div>
                        <div className="tdContent">{cell.render("Cell")}</div>
                      </>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="pagination">
        <div className="controls">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
        </div>
        <div className="go-to-page">
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </div>{" "}
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
  max-width: 1600px;
  margin: 10px auto;
  /* inspired by: https://css-tricks.com/responsive-data-tables/ */
  .responsiveTable .td .tdHeader {
    display: none;
  }

  .responsiveTable .thead .tr {
    display: flex;
  }

  @media screen and (max-width: 799px) {

    .responsiveTable {
      width: 100%;
    }

    /*
      Force table elements to not behave like tables anymore
      Hide table headers (but not display: none;, for accessibility)
    */

    .responsiveTable .table,
    .responsiveTable .thead,
    .responsiveTable .tbody,
    .responsiveTable .th,
    .responsiveTable .td,
    .responsiveTable .tr {
      display: block;
    }

    .responsiveTable .thead .tr {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #333;
      .th {
        flex-grow: 1;
      }
    }

    .responsiveTable .tbody .tr {
      border: 1px solid #000;
      padding: 0.25em;
    }

    .responsiveTable .td {
      /* Behave like a "row" */
      border: none !important;
      position: relative;
      text-align: left !important;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      padding-top: 10px;
      padding-bottom: 10px;
      min-height: 1.5em;
    }

    .responsiveTable .td .tdHeader {
      display: inline-block;
      width: 30%;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      text-align: left !important;
      font-weight: 600;
    }
    .responsiveTable .td .tdContent {
      display: inline-block;
    }
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .th,
  .td {
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .th {
    text-align: left;
  }

  .thead {
    .th {
      background-color: #55608f;
    }
  }

  .tbody {
    background: linear-gradient(45deg, #49a09d, #5f2c82);

    .tr {
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    .td {
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
  .pagination {
    text-align: center;
    padding: 20px 0;
    font-size: 16px;
    .controls {
      padding: 10px;
      > span {
        padding: 5px 10px;
      }
      > button {
        padding: 5px 10px;
        display: inline-block;
        text-align: center;
        background: #eaeaea;
        border-radius: 5px;
      }
    }
    .go-to-page {
      display: none;
    }
  }
  body.dark-theme & {
    .pagination {
      input {
        background: #888;
      }
      .controls {
        > button {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
`;
