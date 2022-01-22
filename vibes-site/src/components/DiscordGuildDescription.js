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
  const bio = ledgerData?.ledger?.meta?.['vibes:community_bio'];

  /*const name = ledgerData?.ledger?.meta?.['vibes:community_name'] || guildData?.name;
  if(name==="PEACEFUL GROUPIES"){
    guildData.description=
    "PEACEFUL GROUPIES is a collection of 10000 unique and trippy characters. These peaceful creatures will follow you on your adventures through this digital psychedelic experience called the PEACEVOID.";
  }*/
  if (to) {
    return (
      <div>
        <span>{bio}</span>
      </div>
    );
  } else {
    return <div>{bio}</div>
  }
}
