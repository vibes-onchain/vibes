import DiscordGuild from "../../models/DiscordGuild";

export default async function resetvibes({ client, message }) {
  const space = await DiscordGuild.findOrCreateSpace(
    message.guild.id,
    message.guild.name
  );
  const entry = SpaceLedgerEntry.build({
    space_id: space.id,
    type: "Reset Vibe Dust",
    value: {
      by_user_id: message.member.user.id,
    },
    authored_on: new Date(),
  });
  await entry.save();

  await DiscordGuild.updateSpaceGuildUsers(client, space.id)
}
