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
      "OG Vibe": ledger?.meta?.["vibes:role_alias:OG Vibe"] || "OG Vibe",
      "Legendary Vibe":
        ledger?.meta?.["vibes:role_alias:Legendary Vibe"] || "Legendary Vibe",
      "Epic Vibe": ledger?.meta?.["vibes:role_alias:Epic Vibe"] || "Epic Vibe",
      "Rare Vibe": ledger?.meta?.["vibes:role_alias:Rare Vibe"] || "Rare Vibe",
      "Frenly Vibe":
        ledger?.meta?.["vibes:role_alias:Frenly Vibe"] || "Frenly Vibe",
      "Sus Vibe": ledger?.meta?.["vibes:role_alias:Sus Vibe"] || "Sus Vibe",
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
        <div className="page-container">
          <div className="leaderboard">
            <div className="member header">
              <span></span>
              <span></span>
              <span>Vibe Stack</span>
              <span>Percentile</span>
              <span>Role</span>
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
  .guild-avatar-holder {
    margin-top: -80px;
    margin-bottom: 40px;
  }
  .guild-name-holder {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: 600;
  }
  .tabs {
    justify-content: center;
    .item {
      margin: 0 20px !important;
    }
  }
  .leaderboard {
    display: table;
    .member {
      display: table-row;
      margin: 10px 0;
      &.header {
        > span {
          font-weight: bold;
        }
      }
      > span {
        display: table-cell;
        padding: 20px 5px;
        @media (min-width: 500px) {
          padding: 20px 20px;
        }
      }
    }
  }
`;
