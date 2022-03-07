/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React from "react";
import { useQuery } from "react-query";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import useRouter from ":/lib/useRouter";
import Loading from ":/components/Loading";
import Ledger from "spothub/lib/Ledger";
import CommunityHeader from ":/routes/ledger/:ledger_id/CommunityHeader";
import Backend from ":/lib/Backend";
import LedgerEntryUserLabel from ":/components/LedgerEntryUserLabel";
import _ from "lodash";
import formatNumber from ":/lib/formatNumber";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useFlexLayout,
} from "react-table";
import { useWindowWidth } from "@react-hook/window-size";
import { matchSorter } from "match-sorter";

import PaginatedTable from ":/components/PaginatedTable";
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

function LeaderboardTable({ leaderBoardMembers, vibe_role_names }) {
  const data = React.useMemo(() => {
    const r = _.sortBy(leaderBoardMembers, "vibestack").reverse().map((i, index) => {
      const base = _.pick(i, [
        "id",
        "member_id",
        "vibestack",
        "vibes_received",
        "unique_vibers",
        "vibestack_percentile",
        "vibe_level_name",
      ]);
      return {
        rank: index + 1,
        ...base,
      };
    });
    return r;
  }, [leaderBoardMembers]);

  const columns = React.useMemo(() => [
    {
      Header: "",
      accessor: "rank",
      Cell: ({ value }) => <>{value}</>,
      width: 10,
    },
    {
      Header: "",
      accessor: "member_id",
      Cell: ({ value }) => <><LedgerEntryUserLabel id={value} /></>,
    },
    {
      Header: "Vibestack",
      accessor: "vibestack",
      Cell: ({ value }) => <>{value > 1
        ? formatNumber(value, "si_rounded")
        : formatNumber(value, "decimal2f")}</>,
    },
    {
      Header: "Vibes Received",
      accessor: "vibes_received",
      Cell: ({ value }) => <>{value}</>,
    },
    {
      Header: "Unique Vibers",
      accessor: "unique_vibers",
      Cell: ({ value }) => <>{value}</>,
    },
    {
      Header: "Percentile",
      accessor: "vibestack_percentile",
      Cell: ({ value }) => <>{formatNumber(value, "percent0f")}</>,
    },
    {
      Header: "Role Name",
      accessor: "vibe_level_name",
      Cell: ({ value }) => <>{value}</>,
    },
  ]);

  const initialSortBy = React.useMemo(
    () => [{ id: "vibestack", desc: true }],
    []
  );

  return (
    <PaginatedTable
      data={data}
      columns={columns}
      initialSortBy={initialSortBy}
    />
  );
}

export default function () {
  const router = useRouter();
  const ledger_id = router.match.params.ledger_id;
  const [ledger, setLedger] = React.useState(null);
  const [guild, setGuild] = React.useState(null);
  const [ledgerEntries, setLedgerEntries] = React.useState(null);

  React.useEffect(() => {
    if (ledger_id) {
      Ledger.findOne({ where: { id: ledger_id } }).then((r) => {
        setLedger(r);
      });
    }
  }, [ledger_id]);

  // React.useEffect(() => {
  //   LedgerEntry.findAll({ where: { ledger_id } }).then((r) => {
  //     setLedgerEntries(r);
  //   });
  // }, [ledger_id]);
  const guild_id = ledger?.meta?.["vibes:discord_guild_id"];

  const { data: ledgerVibes } = useQuery(
    ["DiscordGuildLedgerVibes", guild_id],
    async () => {
      if (guild_id) {
        const r = await Backend.get(`/discord/guild/${guild_id}/ledger/vibes`);
        return r.result?.ledger_vibes;
      }
    }
  );

  const vibe_role_names = (() => {
    return {
      "OG Vibes": ledger?.meta?.["vibes:role_alias:OG Vibes"] || "OG Vibes",
      "Legendary Vibes":
        ledger?.meta?.["vibes:role_alias:Legendary Vibes"] || "Legendary Vibes",
      "Epic Vibes":
        ledger?.meta?.["vibes:role_alias:Epic Vibes"] || "Epic Vibes",
      "Rare Vibes":
        ledger?.meta?.["vibes:role_alias:Rare Vibes"] || "Rare Vibes",
      "Frenly Vibes":
        ledger?.meta?.["vibes:role_alias:Frenly Vibes"] || "Frenly Vibes",
      "Sus Vibes": ledger?.meta?.["vibes:role_alias:Sus Vibes"] || "Sus Vibes",
    };
  })();

  const leaderBoardMembers = _.orderBy(
    Object.entries(ledgerVibes?.profiles || {}).map(([member_id, profile]) => {
      return {
        member_id,
        ...profile,
      };
    }),
    "vibestack"
  ).reverse();

  return (
    <div css={CSS}>
      <Header />
      {guild_id && <CommunityHeader guild_id={guild_id} tab={"leaderboard"} />}
      {!ledgerVibes && <Loading />}
      {ledgerVibes && (
        <LeaderboardTable
          leaderBoardMembers={leaderBoardMembers}
          vibe_role_names={vibe_role_names}
        />
      )}
      {false && ledgerVibes && (
        <div className="page-container leaderboard-holder">
          <div className="leaderboard">
            <div className="member header">
              <span className="rank"></span>
              <span className="username"></span>
              <span className="vibestack">Vibestack</span>
              <span className="vibes_received">Vibes Received</span>
              <span className="vibers">Unique Vibers</span>
              <span className="percentile">Percentile</span>
              <span className="role_name">Role</span>
            </div>
            {leaderBoardMembers.map((member, index) => (
              <div className="member" key={member.member_id}>
                <span className="rank">{index + 1}</span>
                <span className="username">
                  <LedgerEntryUserLabel id={member.member_id} />
                </span>
                <span className="vibestack">
                  {member.vibestack > 1
                    ? formatNumber(member.vibestack, "si_rounded")
                    : formatNumber(member.vibestack, "decimal2f")}
                </span>
                <span className="vibes_received">
                  {formatNumber(member.vibes_received, "count")}
                </span>
                <span className="vibers">
                  {formatNumber(member.unique_vibers, "count")}
                </span>
                <span className="percentile">
                  {formatNumber(member.vibestack_percentile, "percent0f")}
                </span>
                <span className="role_name">
                  {vibe_role_names[member.vibe_level_name]}
                </span>
                {/* {JSON.stringify(member)} */}
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

const CSS = css`
  width: 100%;
  .leaderboard-holder {
    padding: 0;
    overflow: hidden;
    @media (min-width: 500px) {
      padding: 20px;
    }
  }
  .leaderboard {
    .member.header {
      padding-bottom: 10px;
      > span {
        font-weight: bold;
        font-size: 13px;
        text-transform: uppercase;
        display: flex;
        justify-content: space-around;
      }
    }
    .member {
      margin: 10px 0;
      display: flex;
      flex-wrap: no-wrap;
      border-bottom: 1px solid #eaeaea;
      margin-bottom: 20px;
      padding-bottom: 20px;
      font-size: 15px;
      font-weight: 500;

      > span {
        &.rank {
          flex-basis: 30px;
          flex-shrink: 0;
          align-self: center;
        }
        &.username {
          flex-grow: 1;
          flex-basis: calc(100% - 30px);
          align-self: center;
          font-weight: 700;
        }
        &.vibes_received,
        &.vibers,
        &.vibestack,
        &.percentile,
        &.role_name {
          margin-top: 10px;
          flex-basis: 33%;
          text-align: center;
          margin-bottom: 10px;
          align-self: center;
        }
      }
    }
    @media (min-width: 50000px) {
      display: grid;
      grid-template-columns: 0.2fr 1fr 1fr 1fr 1fr;
      .member {
        display: contents;
        margin: 10px 0;
        &.header {
          > span {
            font-weight: bold;
            text-transform: uppercase;
            display: flex;
            justify-content: space-around;
          }
        }
        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          &.username {
            justify-content: flex-start;
          }
          padding: 10px 5px;
          @media (min-width: 500px) {
            padding: 20px 20px;
          }
        }
      }
    }
  }
  body.dark-theme & {
    .member {
      border-bottom: 1px solid #5b5b5b;
    }
  }
`;
