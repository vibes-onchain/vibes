import help from "../cmds/help";

import vibes from "../cmds/vibes";
import badvibes from "../cmds/badvibes";
import vibecheck from "../cmds/vibecheck";

import set_user_vibes from "../cmds/set_user_vibes";
import set_vibenomics from "../cmds/set_vibenomics";
import reset_all_vibes from "../cmds/reset_all_vibes";

import setup_vibes from "../cmds/setup_vibes";

import set_vibes_nickname_template from "../cmds/set_vibes_nickname_template";
import import_vibes_nickname_template from "../cmds/import_vibes_nickname_template";
import set_vibes_metadata from "../cmds/set_vibes_metadata";
import set_vibes_nickname from "../cmds/set_vibes_nickname";
import use_default_nickname from "../cmds/use_default_nickname";
import use_numeric_nickname from "../cmds/use_numeric_nickname";
import set_custom_vibemojis from "../cmds/set_custom_vibemojis";
import new_vibes_ledger from "../cmds/new_vibes_ledger";
import refresh_vibes from "../cmds/refresh_vibes";

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
  if (["vibesbot", "help"].includes(cmd)) {
    return help({ client, message, cmd_args });
  } else if (["vibe", "vibes"].includes(cmd)) {
    return vibes({ client, message, cmd_args });
  } else if (["badvibe", "badvibes", "susvibes", "susvibe"].includes(cmd)) {
    return badvibes({ client, message, cmd_args });
  } else if (["vibecheck", "vibescheck", "vc", "vibe-check"].includes(cmd)) {
    return vibecheck({ client, message, cmd_args });
  } else if (["reset_all_vibes"].includes(cmd)) {
    return reset_all_vibes({ client, message, cmd_args });
  } else if (["set_vibenomics"].includes(cmd)) {
    return set_vibenomics({ client, message, cmd_args });
  } else if (["set_user_vibes", "set_users_vibes"].includes(cmd)) {
    return set_user_vibes({ client, message, cmd_args });
  } else if (cmd === "set_vibes_nickname_template") {
    return set_vibes_nickname_template({ client, message, cmd_args });
  } else if (cmd === "import_vibes_nickname_template") {
    return import_vibes_nickname_template({ client, message, cmd_args });
  } else if (cmd === "set_vibes_metadata") {
    return set_vibes_metadata({ client, message, cmd_args });
  } else if (cmd === "set_vibes_nickname") {
    return set_vibes_nickname({ client, message, cmd_args });
  } else if (cmd === "setup_vibes") {
    return setup_vibes({ client, message, cmd_args, guild_id });
  } else if (cmd === "new_vibes_ledger") {
    return new_vibes_ledger({ client, message, cmd_args, guild_id });
  } else if (cmd === "refresh_vibes") {
    return refresh_vibes({ client, message, cmd_args, guild_id });
  } else if (cmd === "set_custom_vibemojis") {
    return set_custom_vibemojis({ client, message, cmd_args, guild_id });
  } else if (cmd === "use_default_nickname") {
    return use_default_nickname({ client, message, cmd_args, guild_id });
  } else if (cmd === "use_numeric_nickname") {
    return use_numeric_nickname({
      client,
      message,
      cmd_args,
      guild_id,
    });
  }
}
