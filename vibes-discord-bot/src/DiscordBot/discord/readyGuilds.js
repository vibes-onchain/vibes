import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";

export default async function (client, ready_guild_ids = []) {
  const bot_guilds = client.guilds.cache.reduce((acc, guild) => {
    acc[guild.id] = guild.name;
    return acc;
  }, {});
  for (const [guild_id, guild_name] of Object.entries(bot_guilds)) {
    await findOrCreateLedgerForGuild(guild_id, guild_name);
  }
  return bot_guilds;
}
