export const DISCORD_EMBED_COLOR = 0x00eeee;

import getGuildEmojis from "./getEmojis";
import getVibeFeed from "./getVibeFeed";
import getVibesConfigChannel from "./getVibesConfigChannel";

export default function getGuildStuff({ client, guild_id }) {
  const emojis = getGuildEmojis({ client, guild_id });
  const vibeFeedChannel = getVibeFeed({ client, guild_id });
  const vibesConfigChannel = getVibesConfigChannel({ client, guild_id });
  return {
    emojis,
    vibeFeedChannel,
    vibesConfigChannel
  };
}
