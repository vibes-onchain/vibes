import React from "react";
import { useQuery } from "react-query";
import Backend from ":/lib/Backend";

import default_banner_url from ":/assets/img/default-banner.png";

export default function DiscordGuildHeader({ guild_id, to, imgClassName }) {
  const { data } = useQuery(["DiscordGuildLedger", guild_id], async () => {
    if (guild_id) {
      const r = await Backend.get(`/discord/guild/${guild_id}/ledger`);
      return r.result;
    }
  });

  const banner_url =
    data?.ledger?.meta?.["vibes:banner_url"] ||
    data?.guild?.bannerURL ||
    default_banner_url;

  return (
    <div
      className="DiscordGuildBanner"
      style={{
        width: "100%",
        height: "200px",
        backgroundImage: `url("${banner_url}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    ></div>
  );
}
