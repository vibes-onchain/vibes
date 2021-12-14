import getTargetMember from "../message/getTargetMember";
import updateLedgerGuildMembers from "../discord/updateLedgerGuildMembers";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import LedgerEntry from "spothub/lib/LedgerEntry";

export default async function setparen({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  if (
    !message_member.roles.cache.some(
      (role) => role.name === "[Can Control Vibes Bot]"
    )
  ) {
    await message.channel.send(
      "You're not in the role [Can Control Vibes Bot], so you can't run this command."
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
  const evl = JSON.parse(space.meta?.["vibes:labels"] || "{}");
  const vibes_labels = {
    ...(evl || {}),
    [label]: {
      ...(evl?.[label] || {}),
      [member.user.id]: value,
    },
  };
  const le = LedgerEntry.build({
    ledger_id: space.id,
    type: "Set Ledger Metadata",
    value: {
      key: "vibes:labels",
      value: JSON.stringify(vibes_labels),
    },
  });
  await le.save();

  await updateLedgerGuildMembers(client, space.id);
}
