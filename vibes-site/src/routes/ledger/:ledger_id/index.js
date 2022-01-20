/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import React from "react";
import Footer from ":/components/Footer";
import Header from ":/components/Header";
import useRouter from ":/lib/useRouter";
import Loading from ":/components/Loading";
import Ledger from "spothub/lib/Ledger";
import LedgerEntry from "spothub/lib/LedgerEntry";
import LedgerTable from ":/components/LedgerTable";
import DiscordGuildLabel from ":/components/DiscordGuildLabel";
import DiscordGuildName from ":/components/DiscordGuildName";
import DiscordGuildAvatar from ":/components/DiscordGuildAvatar";
import DiscordGuildBanner from ":/components/DiscordGuildBanner";

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

  React.useEffect(() => {
    LedgerEntry.findAll({ where: { ledger_id } }).then((r) => {
      setLedgerEntries(r);
    });
  }, [ledger_id]);

  if (!ledger || !ledgerEntries) {
    return <Loading />;
  }

  const guild_id = ledger.meta?.["vibes:discord_guild_id"];

  return (
    <div css={CSS}>
      <Header />
      <DiscordGuildBanner guild_id={guild_id} />
      <div className="page-container">
        <div className="guild-avatar-holder">
          <DiscordGuildAvatar
            guild_id={guild_id}
            imgClassName={"rounded-full inline-block h-30 w-30"}
          />
        </div>
        <div className="guild-name-holder"><DiscordGuildName guild_id={guild_id} /></div>
        {/* <div className="breadcrumbs space-x-10 my-5">
          {guild_id && (
            <DiscordGuildLabel
              to={`/ledger/${ledger_id}`}
              guild_id={guild_id}
            />
          )}
        </div> */}
      </div>
      <div className="page-container">
        <LedgerTable ledger_id={ledger_id} ledgerEntries={ledgerEntries} />
      </div>
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
`;
