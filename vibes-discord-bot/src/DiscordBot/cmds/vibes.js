import getTargetMember from "../message/getTargetMember";
import saveVibe from "../spothub/saveVibe";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import getMemberDetails from "../multi/getMemberDetails";
import sendResponse from "../discord/sendResponse";
import getVibeFeed from "../discord/getVibeFeed";

export default async function vibes({ client, message, command, cmd_args }) {
  const message_member = message ? message.member : command.member;
  const guild = message_member.guild;
  const guild_id = guild.id;

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;
  const vibeFeed = getVibeFeed({ client, guild_id });

  const target_member = command
    ? cmd_args.find((i) => i.name === "user").member
    : await getTargetMember({ message, cmd_args });
  if (!target_member) {
    return { error: "receiver not found" };
  }

  if (target_member.user.id === message_member.user.id) {
    return { error: `you can only vibe with others` };
  }

  const note = command
    ? cmd_args.find((i) => i.name === "note")?.value
    : cmd_args.slice(1).join(" ");

  await saveVibe({
    ledger_id,
    from_member_id: message_member.id,
    member_id: target_member.id,
    note,
  });

  const sending_member = await getMemberDetails({
    client,
    guild_id,
    member_id: message_member.id,
  });
  const receiving_member = await getMemberDetails({
    client,
    guild_id,
    member_id: target_member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({
    guild_id,
  });

  await sendResponse({
    client,
    guild_id,
    message,
    command,
    response: "vibes",
    ledger_id,
    sending_member,
    receiving_member,
    note,
    vibesLedgerSummary,
  });
  let vibe_level_ascii = "";
  let embed_color = "";
  if (sending_member.vibe_level == 1) {
    embed_color = "#8f9296";
    vibe_level_ascii = "˙";
  } else if (sending_member.vibe_level == 2) {
    embed_color = "#5397d5";
    vibe_level_ascii = "‧⁚";
  } else if (sending_member.vibe_level == 3) {
    embed_color = "#915db1";
    vibe_level_ascii = "⁛⁚";
  } else if (sending_member.vibe_level == 4) {
    embed_color = "#d7823b";
    vibe_level_ascii = "⁚⁛⁚";
  } else if (sending_member.vibe_level == 5) {
    embed_color = "#eac545";
    vibe_level_ascii = "⁛⁚⁛⁚";
  }
  await message.delete();
  let message_url = `<#${vibeFeed.id}>`;
  await vibeFeed.messages.fetch({ limit: 1 }).then((messages) => {
    let lastMessage = messages.first();
    console.log(lastMessage);
    message_url = lastMessage.url;
  });
  await message.channel.send({
    embeds: [
      {
        color: embed_color,
        description: `<@${receiving_member.user_id}> ⟨ ✨${vibe_level_ascii} | **[more](${message_url})**`,
      },
    ],
  });
  return true;
}
