import getEmojis from "../discord/getEmojis";
import getGuildMemberDetails from "../discord/getGuildMemberDetails";
import getVibesUserDetails from "../spothub/getVibesUserDetails";

export default async function getMemberDetails({
  client,
  guild_id,
  member_id,
}) {
  const emojis = await getEmojis({client, guild_id});
  const md = await getGuildMemberDetails({ client, guild_id, member_id });
  const vu = await getVibesUserDetails({ client, guild_id, member_id });
  return {
    ...md,
    ...vu,
    vibeLevelEmoji: emojis[vu.vibeLevelEmojiName]
  };
}
