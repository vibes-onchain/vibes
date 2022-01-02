import LedgerEntry from "spothub/lib/LedgerEntry";
import saveVibe from "../spothub/saveVibe";
import saveBadVibe from "../spothub/saveBadVibe";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getEmojis from "./getEmojis";
import getVibeFeed from "./getVibeFeed";
import { GOOD_VIBE_EMOJI_NAMES, BAD_VIBE_EMOJI_NAMES } from "../constants";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import getMemberDetails from "../multi/getMemberDetails";
import getGuildMemberFromUserId from "./getGuildMemberFromUserId";
import getGuildMemberDetails from "./getGuildMemberDetails";
import _ from "lodash";

async function handleVibeReaction({
  ledger_id,
  from_member_id,
  to_member_id,
  reason,
  reaction_to_message_id,
  entryType,
}) {
  if (entryType === "Vibe") {
    await saveVibe({
      ledger_id: ledger_id,
      from_member_id: from_member_id,
      member_id: to_member_id,
      reason,
      reaction_to_message_id,
    });
  } else if (entryType === "BadVibe") {
    await saveBadVibe({
      ledger_id: ledger_id,
      from_member_id: from_member_id,
      member_id: to_member_id,
      reason,
      reaction_to_message_id,
    });
  }
}

export default async function handleReaction(client, reaction, user) {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }

  let entryType = null;
  if (GOOD_VIBE_EMOJI_NAMES.includes(reaction.emoji.name)) {
    entryType = "Vibe";
  } else if (BAD_VIBE_EMOJI_NAMES.includes(reaction.emoji.name)) {
    entryType = "BadVibe";
  } else {
    return;
  }

  const message = reaction.message;
  const message_member = message.member;
  const to_member_id = message_member.id;
  const to_member_username = message_member.user.username;
  const guild = message_member.guild;
  const guild_id = guild.id;
  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  // note discord user_ids and member_ids are the same
  const reactionMemberIds = Object.keys(
    Object.fromEntries(await reaction.users.fetch())
  );

  const entries = await LedgerEntry.findAll({
    where: {
      ledger_id: ledger.id,
      type: entryType,
      value: { reaction_to_message_id: message.id },
    },
  });
  const existingReactionsByMemberIds = entries.map((i) => i.sender.id);
  const newReactionMemberIds = _.difference(
    reactionMemberIds,
    existingReactionsByMemberIds
  );
  for (const member_id of newReactionMemberIds) {
    const fromMember = guild.members.cache.find((i) => i.user.id === member_id);
    const from_member_id = fromMember.id;
    const from_member_username = fromMember.user.username;
    const note = message.content;

    await handleVibeReaction({
      client,
      guild_id,
      ledger_id,
      from_member_id,
      from_member_username,
      to_member_id,
      to_member_username,
      note,
      reaction_to_message_id: message.id,
      entryType,
    });
  }
}
