import { stripIndent } from "common-tags";

import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getTargetMember from "../message/getTargetMember";
import getEmojis from "../discord/getEmojis";
import getMemberDetails from "../multi/getMemberDetails";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import sendResponse from "../discord/sendResponse";
import getVibeFeed from "../discord/getVibeFeed";

const disable_in_channel_messages = true;

export default async function vibecheck({
  client,
  command,
  message,
  cmd_args,
}) {
  const message_member = message ? message.member : command.member;
  const guild = message_member.guild;
  const guild_id = guild.id;

  const target_member = command
    ? cmd_args.find((i) => i.name === "user").member
    : await getTargetMember({ message, cmd_args });
  if (!target_member) {
    return { error: "receiver not found" };
  }

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;
  const vibeFeed = await getVibeFeed({ client, guild_id });

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

  const vibesLedgerSummary = await getVibesLedgerSummary({ guild_id });

  await sendResponse({
    client,
    guild_id,
    message,
    command,
    response: "vibecheck",
    ledger_id,
    sending_member,
    receiving_member,
    vibesLedgerSummary,
  });
  let vibe_level_ascii = "";
  if (sending_member.vibe_level == 1) {
    vibe_level_ascii = "˙";
  } else if (sending_member.vibe_level == 2) {
    vibe_level_ascii = "‧⁚";
  } else if (sending_member.vibe_level == 3) {
    vibe_level_ascii = "⁛⁚";
  } else if (sending_member.vibe_level == 4) {
    vibe_level_ascii = "⁚⁛⁚";
  } else if (sending_member.vibe_level == 5) {
    vibe_level_ascii = "⁛⁚⁛⁚";
  }
  await message.delete();
  let message_url = `<#${vibeFeed.id}>`;
  await vibeFeed.messages.fetch({ limit: 1 }).then((messages) => {
    let lastMessage = messages.first();
    message_url = lastMessage.url;
  });
  await message.channel.send({
    embeds: [
      {
        color: "#000000",
        description: stripIndent`${"`"}!VIBECHECK${"`"}${vibe_level_ascii}🔎<@${
          receiving_member.user_id
        }>
        ${""}
        *Check by @${
          sending_member.username
        }*    **[see result →](${message_url})**
        `,
      },
    ],
  });

  return true;
}
