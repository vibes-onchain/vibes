import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  await findOrCreateLedgerForGuild(guild_id);
  if (!guild.channels.cache.find((i) => i.name === 'vibes-config')) {
    const channel = await guild.channels.create('vibes-config', {
      position: 0,
      permissionOverwrites: [{
        id: client.user.id,
        allow: ['VIEW_CHANNEL'],
      },{
        id: guild.id,
        deny: ['VIEW_CHANNEL'],
      }],
    });
    await channel.send('time for some vibes :sparkles: :call_me: to get started respond with `!setup_vibes`');
  }
  return true;
}
