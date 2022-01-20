import getGuildStuff from "./getGuildStuff";

import * as help from "../responses/help";
import * as vibes from "../responses/vibes";
import * as badvibes from "../responses/badvibes";
import * as vibecheck from "../responses/vibecheck";
import * as set_user_vibes from "../responses/set_user_vibes";
import * as no_vibing_vibe_commands from "../responses/no_vibing_vibe_commands";

const RESPONSES = {
  help,
  vibes,
  badvibes,
  set_user_vibes,
  no_vibing_vibe_commands,
  vibecheck
};

export default async function ({
  client,
  guild_id,
  response,
  message,
  command,
  sender,
  receiver,
  ephemeral = true,
  disable_in_channel_messages = true,
  ...args
}) {
  const Response = RESPONSES[response];
  console.log(
    `[RESPONDING] TO: discord:${guild_id || "dm"}:${message?.author?.id})`
  );

  if (command) {
    // RESPOND TO INTERACTION
    if (Response.forCommandReply) {
      await command
        .reply({
          ...Response.forCommandReply({ client, guild_id, ...args }),
          ephemeral,
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await command
        .reply({ content: ":ballot_box_with_check:", ephemeral })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  // MESSAGE VIBE_FEED
  const { vibeFeedChannel } = getGuildStuff({ client, guild_id });
  if (Response.forVibeFeed) {
    await vibeFeedChannel
      ?.send(Response.forVibeFeed({ client, guild_id, ...args }))
      .catch((e) => {
        console.log(e);
      });
  }

  // MESSAGE CHANNEL
  if (!disable_in_channel_messages && message) {
    if (
      Response.forChannel &&
      message?.channel?.id &&
      vibeFeedChannel.id !== message.channel.id
    ) {
      await message.channel
        ?.send(Response.forChannel({ client, guild_id, ...args }))
        .catch((e) => {
          console.log(e);
        });
    }
  }

  // DM SENDER
  if (sender && Response.forSender) {
    try {
      await command.reply({
        ...Response.forSender({ client, guild_id, ...args }),
        ephemeral,
      });
    } catch (e) {
      console.log(e);
    }
  }

  // DM RECEIVER
  if (receiver && Response.forReceiver) {
    try {
      await command.reply({
        ...Response.forReceiver({ client, guild_id, ...args }),
        ephemeral,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
