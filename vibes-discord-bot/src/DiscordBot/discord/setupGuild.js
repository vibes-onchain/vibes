import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import setupVibeRoles from "../multi/setupVibeRoles";
import setupVibeEmojis from "./setupVibeEmojis";
import setupVibeChannels from "./setupVibeChannels";
import setupVibeCommands from "./setupVibeCommands";

export default async function ({ client, guild_id }) {
  await findOrCreateLedgerForGuild(guild_id);
  await setupVibeRoles({ client, guild_id });
  await setupVibeEmojis({ client, guild_id });
  await setupVibeChannels({ client, guild_id });
  await setupVibeCommands({ client, guild_id });
  return true;
}
