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

  return (
    <>
      <Header />
      <div className="page-container">
        <div css={CSS}>
          <div className="breadcrumbs space-x-10 my-5">
            {ledger.meta?.["vibes:discord_guild_id"] && (
              <DiscordGuildLabel
                to={`/ledger/${ledger_id}`}
                guild_id={ledger.meta?.["vibes:discord_guild_id"]}
              />
            )}
          </div>
          <LedgerTable ledger_id={ledger_id} ledgerEntries={ledgerEntries} />
        </div>
      </div>
      <Footer />
    </>
  );
}

const CSS = css``;
