import DiscordGuild from "../../models/DiscordGuild";
import updateSpaceGuildUsers from "../../updateSpaceGuildUsers";

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

  await updateSpaceGuildUsers(client, space.id)
}
