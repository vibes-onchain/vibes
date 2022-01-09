import React from "react";
import { Link } from "react-router-dom";
import {useQuery} from 'react-query';
import Backend from ':/lib/Backend';

export default function LedgerEntryUserName({ type, id, to }) {
  const {data} = useQuery(`discordUserData:${id}`, async () => {
    if (id) {
      const r = await Backend.get(`/discord/user/${id}`);
      return r.result?.user;
    }
  });

  const name = data?.username || id;

  if (to) {
    return <Link to={to}>{name}</Link>;
  } else {
    return <span>{name}</span>;
  }
}
