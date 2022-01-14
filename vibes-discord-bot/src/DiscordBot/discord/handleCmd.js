import help from "../cmds/help";

import vibes from "../cmds/vibes";
import badvibes from "../cmds/badvibes";
import vibecheck from "../cmds/vibecheck";

import setvibestack from "../cmds/setvibestack";
import setvibenomics from "../cmds/setvibenomics";
import resetvibestacks from "../cmds/resetvibestacks";

import set_vibes_nickname_template from "../cmds/set_vibes_nickname_template";
import setvibestrait from "../cmds/setvibestrait";

import setupvibes from "../cmds/setupvibes";

import newvibesledger from "../cmds/newvibesledger";
import refreshvibeparens from "../cmds/refreshvibeparens";

export default async function handleCmd({ client, message, cmd, cmd_args }) {
  const guild_id = message?.guild?.id || message?.guild_id;

  if (!cmd && !cmd_args) {
    cmd_args = message.content.split(" ");
    cmd_args.shift();
    cmd = cmd_args.shift();
  }
  console.log(
    `[${cmd}] FROM: discord:${guild_id || "dm"}:${message.author.id
    } :: ARGS: (${cmd_args.join(", ")})`
  );
  if (["vibesbot", "help"].includes(cmd)) {
    return help({ client, message, cmd_args });
  } else if (["vibe", "vibes"].includes(cmd)) {
    return vibes({ client, message, cmd_args });
  } else if (["badvibe", "badvibes", "susvibes", "susvibe"].includes(cmd)) {
    return badvibes({ client, message, cmd_args });
  } else if (["vibecheck", "vibescheck", "vc"].includes(cmd)) {
    return vibecheck({ client, message, cmd_args });
  } else if (["resetvibestacks"].includes(cmd)) {
    return resetvibestacks({ client, message, cmd_args });
  } else if (["setvibenomics"].includes(cmd)) {
    return setvibenomics({ client, message, cmd_args });
  } else if (["setvibestack"].includes(cmd)) {
    return setvibestack({ client, message, cmd_args });
  } else if (cmd === "set_vibes_nickname_template") {
    return set_vibes_nickname_template({ client, message, cmd_args });
  } else if (cmd === "setvibestrait") {
    return setvibestrait({ client, message, cmd_args });
  } else if (cmd === "setupvibes") {
    return setupvibes({ client, message, cmd_args, guild_id });
  } else if (cmd === "newvibesledger") {
    return newvibesledger({ client, message, cmd_args, guild_id });
  } else if (cmd === "refreshvibeparens") {
    return refreshvibeparens({ client, message, cmd_args, guild_id });
  }
}
