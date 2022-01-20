import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import setupVibeRoles from "../multi/setupVibeRoles";
import setupVibeEmojis from "./setupVibeEmojis";
import setupVibeChannels from "./setupVibeChannels";

export default async function (client, ready_guild_ids = []) {
  const bot_guilds = client.guilds.cache.reduce((acc, guild) => {
    acc[guild.id] = guild.name;
    return acc;
  }, {});
  for (const [guild_id, guild_name] of Object.entries(bot_guilds)) {
    await findOrCreateLedgerForGuild(guild_id, guild_name);
    await setupVibeRoles({client, guild_id});
    await setupVibeEmojis({client, guild_id});
    await setupVibeChannels({client, guild_id});
  }
  return bot_guilds;
}
