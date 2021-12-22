import getTargetMember from "../message/getTargetMember";
import getVibeFeed from "./getVibeFeed";

export default async function parseEmojisForMessage(message, cmd_args, text) {
  const member = message?.member;
  const guild = message?.member?.guild;

  const vibedust_emoji =
    guild?.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

  const vibesEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "vibes"
  );
  const badvibes_emoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "susvibes"
  );
  const rareVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "rarevibe"
  );
  const epicVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "epicvibe"
  );
  const legendaryVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "legendaryvibe"
  );
  const ogVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "ogvibe"
  );
  const targetMember = await getTargetMember({ message, cmd_args });

  const vibeFeedChannel = await getVibeFeed({ client, guild_id: guild.id });
  const nameToEmoji = {
    vibedustEmoji: vibedust_emoji,
    vibesEmoji: vibesEmoji,
    ogEmoji: ogVibeEmoji,
    rareEmoji: rareVibeEmoji,
    legendaryEmoji: legendaryVibeEmoji,
    epicEmoji: epicVibeEmoji,
    susvibesEmoji: badvibes_emoji,
    vibeSender: member,
    commandingUser: member,
    targetedUser: targetMember,
    vibeFeed: `<#${vibeFeedChannel?.id}>`,
  };
  return text.replace(
    /\b(?:vibedustEmoji|vibesEmoji|ogEmoji|rareEmoji|legendaryEmoji|epicEmoji|susvibesEmoji|vibeSender|vibeFeed|targetedUser|commandingUser)\b/gi,
    (matched) => nameToEmoji[matched]
  );
}
