import getGuildStuff from "./getGuildStuff";

import * as help from "../responses/help";

const RESPONSES = {
  help,
};

export default async function ({
  client,
  guild_id,
  response,
  message,
  command,
  ephemeral = true,
  sender,
  receiver,
  ...args
}) {
  const Response = RESPONSES[response];

  if (command) {
    // RESPOND TO INTERACTION
    if (Response.forCommandReply) {
      await command.reply({
        ...Response.forCommandReply({ client, guild_id, ...args }),
        ephemeral,
      });
    } else {
      await command.reply({ content: ":check:", ephemeral });
    }
  } else if (message) {
    const {vibeFeedChannel} = getGuildStuff({ client, guild_id });
    // MESSAGE VIBE_FEED
    if (Response.forVibeFeed) {
      await vibeFeedChannel
        ?.send(Response.forVibeFeed({ client, guild_id, ...args }))
        .catch((e) => {
          console.log(e);
        });
    }

    // MESSAGE CHANNEL
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
    await command.reply({
      ...Response.forSender({ client, guild_id, ...args }),
      ephemeral,
    });
  }

  // DM RECEIVER
  if (receiver && Response.forReceiver) {
    await command.reply({
      ...Response.forReceiver({ client, guild_id, ...args }),
      ephemeral,
    });
  }
}
