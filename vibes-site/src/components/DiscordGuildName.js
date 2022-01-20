import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Backend from ":/lib/Backend";

export default function DiscordGuildName({ guild_id, to, imgClassName }) {
  const { data: guildData } = useQuery(["DiscordGuild", guild_id], async () => {
    if (guild_id) {
      const r = await Backend.get(`/discord/guild/${guild_id}`);
      return r.result?.guild;
    }
  });
  const { data: ledgerData } = useQuery(["DiscordGuildLedger", guild_id], async () => {
    if (guild_id) {
      const r = await Backend.get(`/discord/guild/${guild_id}/ledger`);
      return r.result;
    }
  });

  if (!guildData || !ledgerData) {
    return <span></span>;
  }

  const name = ledgerData?.ledger?.meta?.['vibes:community_name'] || guildData?.name;

  if (to) {
    return (
      <Link to={to}>
        <span>{name}</span>
      </Link>
    );
  } else {
    return <span>{name}</span>;
  }
}
