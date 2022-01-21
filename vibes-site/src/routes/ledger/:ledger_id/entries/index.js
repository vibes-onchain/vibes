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
import { Menu, Segment } from "semantic-ui-react";
import CommunityHeader from ':/routes/ledger/:ledger_id/CommunityHeader';

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

  const guild_id = ledger?.meta?.["vibes:discord_guild_id"];

  return (
    <div css={CSS}>
      <Header />
      {guild_id && <CommunityHeader guild_id={guild_id} tab={'ledger'} />}
      <div className="page-container">
        {!ledgerEntries && <Loading />}
        {ledgerEntries && <LedgerTable ledger_id={ledger_id} ledgerEntries={ledgerEntries} />}
      </div>
      <Footer />
    </div>
  );
}

const CSS = css`
  width: 100%;
`;
