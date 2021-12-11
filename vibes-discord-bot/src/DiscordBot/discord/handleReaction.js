export default async function handleReaction() {
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
  const guild = message_member.guild;
  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);

  if (reaction.emoji.name == "vibedust") {
    const reactionUsers = Array.from(await reaction.users.fetch());
    const lastReactionUser = reactionUsers.at(-1)[1];

    if (lastReactionUser.id === message_member.user.id) {
      return;
    }

    const reason = message.content;
    await saveVibe({
      ledger_id: space.id,
      from_user_id: lastReactionUser.id,
      user_id: message_member.user.id,
      reason,
    });

    const vibesEmbedFeed = {
      color: 0x00eeee,
      title: await parseEmojisForMessage(
        message,
        `vibesEmoji  **!vibes**  vibesEmoji`
      ),
      url: `https://vibes.live/[VibesLiveCommunityID]`,
      description: await parseEmojisForMessage(
        message,
        ` :right_arrow: vibedustEmoji  [targetedUser.@username] – u got vibes vibesEmoji  from [commandingUser.username]
            for [tx.discordPostLink]
            :pancakes: [commandingUser] has a **\`VIBESTACK\`** of [commandingUser.vibestack] this **\`VIBEPERIOD\`** (vibes.live/[commandingUser.VibesLiveId])
            :timer: **\`VIBEPERIOD\`** ends in [vibeperiodRemaining?]
            
            :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`
      ),
      footer: {
        text: `Powered by Spot`,
        icon_url: "https://i.imgur.com/1c0avUE.png",
      },
    };

    const vibeFeedChannel = message.guild.channels.cache.find(
      (channel) => channel.name === "vibe-feed"
    );
    // await message.channel.send(await parseEmojisForMessage(message, `:clipboard: susvibesEmoji  **vibescan.io/[tx.vibescanTX]**`)).catch(e => {
    //   console.log(e);
    // });
    await vibeFeedChannel.send({ embeds: [vibesEmbedFeed] }).catch((e) => {
      console.log(e);
    });
  } else if (reaction.emoji.name == "susvibes") {
    const reactionUsers = Array.from(await reaction.users.fetch());
    const lastReactionUser = reactionUsers.at(-1)[1];

    if (lastReactionUser.id === message_member.user.id) {
      return;
    }

    const reason = message.content;
    await saveBadVibe({
      ledger_id: space.id,
      from_user_id: lastReactionUser.id,
      user_id: message_member.user.id,
      reason,
    });

    const badVibesEmbedFeed = {
      color: 0x00eeee,
      title: await parseEmojisForMessage(
        message,
        `:arrow_right: vibedustEmoji New Vibe Distro! vibedustEmoji  vibedustEmoji`
      ),
      url: `https://vibes.live/[VibesLiveCommunityID]`,
      description: await parseEmojisForMessage(
        message,
        `:right_arrow: susvibesEmoji   [targetedUser.@username] – u got susvibes susvibesEmoji   from [commandingUser.username]
          for [tx.discordPostLink]
          :pancakes: [commandingUser] has a **\`VIBESTACK\`** of [commandingUser.vibestack] this **\`VIBEPERIOD\`** (vibes.live/[commandingUser.VibesLiveId])
          :timer: **\`VIBEPERIOD\`** ends in [vibeperiodRemaining?]
          
          :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`
      ),
      footer: {
        text: `Powered by Spot`,
        icon_url: "https://i.imgur.com/1c0avUE.png",
      },
    };

    const vibeFeedChannel = message.guild.channels.cache.find(
      (channel) => channel.name === "vibe-feed"
    );
    await message.channel
      .send(
        await parseEmojisForMessage(
          message,
          `:clipboard: susvibesEmoji  **vibescan.io/[tx.vibescanTX]**`
        )
      )
      .catch((e) => {
        console.log(e);
      });
    await vibeFeedChannel.send({ embeds: [badVibesEmbedFeed] }).catch((e) => {
      console.log(e);
    });
  } else {
    return;
  }
}
