import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Backend from ":/lib/Backend";

export default function DiscordGuildAvatar({ guild_id, to, imgClassName }) {
  const { data } = useQuery(["DiscordGuild", guild_id], async () => {
    if (guild_id) {
      const r = await Backend.get(`/discord/guild/${guild_id}`);
      return r.result?.guild;
    }
  });

  if (!data) {
    return <span></span>;
  }

  if (to) {
    return (
      <Link to={to}>
        <img
          className={imgClassName || "rounded-full inline-block h-10 w-10"}
          src={data.iconURL}
        />
      </Link>
    );
  } else {
    return (
      <img
        className={imgClassName || "rounded-full inline-block h-10 w-10"}
        src={data.iconURL}
      />
    );
  }
}
