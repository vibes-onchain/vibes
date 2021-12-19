import saveVibe from "../spothub/saveVibe";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getEmojis from "./getEmojis";
import getVibeFeed from "./getVibeFeed";
import { GOOD_VIBE_EMOJI_NAMES, BAD_VIBE_EMOJI_NAMES } from "../constants";
import getVibesLedgerSummary from '../spothub/getVibesLedgerSummary';
import getMemberDetails from '../multi/getMemberDetails';

async function handleVibeReaction({
  client,
  ledger_id,
  guild_id,
  from_member_id,
  from_member_username,
  to_member_id,
  to_member_username,
  reason,
  valence = 1,
}) {
  await saveVibe({
    ledger_id: ledger_id,
    from_member_id: from_member_id,
    member_id: to_member_id,
    reason,
  });

  const emojis = await getEmojis({ client, guild_id });
  const vibeFeed = await getVibeFeed({ client, guild_id });
  const valvibes = valence === -1 ? "susvibes" : "vibes";

  const vibesLedgerSummary = await getVibesLedgerSummary({
    guild_id,
  });
  const senderDetails = await getMemberDetails({
    client,
    guild_id,
    member_id: from_member_id,
  });

  const vibesFeedEmbed = {
    color: 0x00eeee,
    url: `https://www.vibesbot.gg`,
    title: `${emojis[valvibes]}  **!${valvibes}**  ${emojis[valvibes]}`,
    description: `:arrow_right: ${
      emojis[valvibes]
    } @${to_member_username} – u got vibes ${
      emojis[valvibes]
    } from @${from_member_username} ${reason ? `\nfor "${reason}"` : ""}
    :pancakes: @${from_member_username} has a **\`VIBESTACK\`** of ${
      senderDetails.vibestack || 0
    } this **\`VIBEPERIOD\`** [vibe.live](${
      process.env.VIBES_LIVE_BASE_URL
    }/ledger/${ledger_id}/profile/discord_member-${from_member_id})
    :timer: **\`VIBEPERIOD\`** ends ${vibesLedgerSummary.vibe_period_remaining}
    :clipboard:Full Tx log – **[vibescan.io](${
      process.env.VIBESCAN_BASE_URL
    }/ledger/${ledger_id})**`,
  };
  await vibeFeed?.send({ embeds: [vibesFeedEmbed] }).catch((e) => {
    console.log(e);
  });
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
  const message = reaction.message;
  const message_member = message.member;
  const to_member_id = message_member.id;
  const to_member_username = message_member.user.username;
  const guild = message_member.guild;
  const guild_id = guild.id;
  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  const reactionUsers = Array.from(await reaction.users.fetch());
  const lastReactionUser = reactionUsers.at(-1)[1];

  // TODO fix as last reaction not always by sending member
  if (lastReactionUser.id === message_member.user.id) {
    return;
  }
  const fromMember = guild.members.cache.find(
    (i) => i.user.id === lastReactionUser.id
  );
  const from_member_id = fromMember.id;
  const from_member_username = fromMember.user.username;

  const reason = message.content;

  if (GOOD_VIBE_EMOJI_NAMES.includes(reaction.emoji.name)) {
    await handleVibeReaction({
      client,
      guild_id,
      ledger_id,
      from_member_id,
      from_member_username,
      to_member_id,
      to_member_username,
      reason,
      valence: 1,
    });
  } else if (BAD_VIBE_EMOJI_NAMES.include(reaction.emoji.name)) {
    await handleVibeReaction({
      client,
      guild_id,
      ledger_id,
      from_member_id,
      to_member_id,
      reason,
      valence: -1,
    });
  } else {
    return;
  }
}
