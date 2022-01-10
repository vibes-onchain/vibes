import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Backend from ":/lib/Backend";

export default function DiscordGuildHeader({ guild_id, to, imgClassName }) {
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
        {" "}
        <span className="DiscordGuildLabel space-x-2">
          <img
            className={imgClassName || "rounded-full inline-block h-10 w-10"}
            src={data.iconURL}
          />
          <span>{data.name}</span>
        </span>
      </Link>
    );
  } else {
    return (
      <span className="DiscordGuildLabel space-x-2">
        <img
          className={imgClassName || "rounded-full inline-block h-10 w-10"}
          src={data.iconURL}
        />
        <span>{data.name}</span>
      </span>
    );
  }
}
