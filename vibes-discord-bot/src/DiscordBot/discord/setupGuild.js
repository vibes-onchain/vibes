import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import setupVibeRoles from "./setupVibeRoles";
import setupVibeEmojis from "./setupVibeEmojis";
import setupVibeChannels from "./setupVibeChannels";

export default async function ({ client, guild_id }) {
  await findOrCreateLedgerForGuild(guild_id);
  await setupVibeRoles({ client, guild_id });
  await setupVibeEmojis({ client, guild_id });
  await setupVibeChannels({ client, guild_id });
  return true;
}
