import updateGuildMemberVibeRole from "../discord/updateGuildMemberVibeRoles";
import updateGuildMemberNickname from "../discord/updateGuildMemberNickname";
import getVibesUserDetails from "../spothub/getVibesUserDetails";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import renderNickname from "../spothub/renderVibesNickname";

export default async function updateGuildMember({
  client,
  guild_id,
  member_id,
}) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  if (!member_id) {
    throw new Error("needs member_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  await guild.members.fetch(member_id).catch((e) => console.log(e));
  const member = guild.members.cache.find((m) => m.id === member_id);
  if (!member) {
    throw new Error("member not found");
  }
  const username = member.user?.username;
  if (!member) {
    throw new Error("member missing username");
  }

  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const template = ledger.meta?.["vibes:nickname_template"];
  const memberDetails = await getVibesUserDetails({ guild_id, member_id });
  // TODO include vibe traits
  const nickname = await renderNickname({
    template,
    context: { ...memberDetails, username },
  });
  const updatedNickname = await updateGuildMemberNickname({
    client,
    guild_id,
    member_id,
    nickname: nickname.substring(0, 32),
  });

  // TODO figure out vibe role
  // updateGuildMemberVibeRoles
  const updatedVibesRole = await updateGuildMemberVibeRole({
    client,
    guild_id,
    member_id,
    role_name: memberDetails.vibeLevel,
  });

  console.log(
    `update {nickname:${!!updatedNickname ? "1" : "0"}, role:${
      !!updatedVibesRole ? "1" : "0"
    }} ${guild_id}:${member_id} ${
      member.user.username
    } => ${nickname}`
  );

  // console.log({updatedNickname, updatedVibesRole});
  return updatedNickname || updatedVibesRole;
}
