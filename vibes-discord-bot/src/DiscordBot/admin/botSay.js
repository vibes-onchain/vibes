import _ from "lodash";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getGuildStuff from "../discord/getGuildStuff";

export default async function ({ client, guild_id, text}) {
  // const guild_ids = client.guilds.cache.map((g) => g.id === guild_id);
  const guild = client.guilds.cache.find(i => i.id === guild_id);
  let {vibesConfigChannel} = getGuildStuff({client, guild_id, text});
  if (!vibesConfigChannel) {
    vibesConfigChannel = await guild.channels.create('vibes-config', {
      position: 0,
      permissionOverwrites: [{
        id: client.user.id,
        allow: ['VIEW_CHANNEL'],
      },{
        id: guild.id,
        deny: ['VIEW_CHANNEL'],
      }],
    });
  }
  await vibesConfigChannel?.send(text);
}
