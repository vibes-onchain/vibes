import DiscordGuild from "../../models/DiscordGuild";
import getTargetMember from "../getTargetMember";
import updateSpaceGuildUsers from "../../discord/updateSpaceGuildUsers";
import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";

export default async function setparen({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  if (
    !message_member.roles.cache.some(
      (role) => role.name === "__CanControlFrenlyBot__"
    )
  ) {
    await message.channel.send(
      "You're not in the role __CanControlFrenlyBot__, so you can't run this command."
    );
    return;
  }

  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }

  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const label = cmd_args[1];
  const value = cmd_args.length > 2 ? cmd_args[2] : null;
  space.meta = {
    ...space.meta,
    frenly_labels: {
      ...(space.meta?.frenly_labels || {}),
      [label]: {
        ...(space.meta?.frenly_labels?.[label] || {}),
        [member.user.id]: value,
      },
    },
  };
  space.changed("meta", true);
  await space.save();

  await updateSpaceGuildUsers(client, space.id);
}
