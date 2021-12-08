import DiscordGuild from "../../models/DiscordGuild";
import updateLedgerGuildMembers from "../../discord/updateLedgerGuildMembers";
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

  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);
  space.meta = { ...space.meta, frenly_paren: cmd_args.join(' ') };
  space.changed("meta", true);
  await space.save();

  await updateLedgerGuildMembers(client, space.id); 
}
