import help from "../cmds/help";

import vibes from "../cmds/vibes";
import badvibes from "../cmds/badvibes";
import vibecheck from "../cmds/vibecheck";

import setvibedust from "../cmds/setvibedust";
import setviberate from "../cmds/setviberate";
import resetvibedust from "../cmds/resetvibedust";

import setvibesparen from "../cmds/setvibesparen";
import setvibestrait from "../cmds/setvibestrait";

import setupvibes from "../cmds/setupvibes";

export default async function handleCmd({ client, message, cmd, cmd_args }) {
  const guild_id = message?.guild?.id || message?.guild_id;

  if (!cmd && !cmd_args) {
    cmd_args = message.content.split(" ");
    cmd_args.shift();
    cmd = cmd_args.shift();
  }
  console.log(
    `[${cmd}] FROM: discord:${guild_id || "dm"}:${
      message.author.id
    } :: ARGS: (${cmd_args.join(", ")})`
  );
  if (cmd === "vibesbot") {
    return help({ client, message, cmd_args });
  } else if (["vibe", "vibes"].includes(cmd)) {
    return vibes({ client, message, cmd_args });
  } else if (["badvibe", "badvibes", "susvibes", "susvibe"].includes(cmd)) {
    return badvibes({ client, message, cmd_args });
  } else if (["vibecheck", "vibescheck", "vc"].includes(cmd)) {
    return vibecheck({ client, message, cmd_args });
  } else if (["resetvibestacks"].includes(cmd)) {
    return resetvibedust({ client, message, cmd_args });
  } else if (["setvibenomics"].includes(cmd)) {
    return setviberate({ client, message, cmd_args });
  } else if (["setvibestack"].includes(cmd)) {
    return setvibedust({ client, message, cmd_args });
  } else if (cmd === "setvibesparen") {
    return setvibesparen({ client, message, cmd_args });
  } else if (cmd === "setvibestrait") {
    return setvibestrait({ client, message, cmd_args });
  } else if (cmd === "setupvibes") {
    return setupvibes({ client, message, cmd_args, guild_id });
  }
}
