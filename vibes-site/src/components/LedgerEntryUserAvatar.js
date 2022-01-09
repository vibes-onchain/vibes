import React from "react";
import { Link } from "react-router-dom";
import {useQuery} from 'react-query';
import Backend from ':/lib/Backend';

export default function LedgerEntryUserAvatar({ type, id, to, imgClassName }) {
  const {data} = useQuery(`discordUserData:${id}`, async () => {
    if (id) {
      const r = await Backend.get(`/discord/user/${id}`);
      return r.result?.user;
    }
  });

  const image_src = data?.displayAvatarURL || "https://cdn.discordapp.com/embed/avatars/1.png";

  if (to) {
    return <Link to={to}><img className={imgClassName || "rounded-full"} src={image_src} /></Link>;
  } else {
    return <img className={imgClassName || "rounded-full"} src={image_src} />;
  }
}
