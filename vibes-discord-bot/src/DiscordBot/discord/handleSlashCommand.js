import help from "../cmds/help";

import vibes from "../cmds/vibes";
import badvibes from "../cmds/badvibes";
import vibecheck from "../cmds/vibecheck";

import set_user_vibes from "../cmds/set_user_vibes";
import set_vibenomics from "../cmds/set_vibenomics";
import reset_all_vibes from "../cmds/reset_all_vibes";

import set_vibes_nickname_template from "../cmds/set_vibes_nickname_template";
import set_vibes_metadata from "../cmds/set_vibes_metadata";
import set_vibes_nickname from "../cmds/set_vibes_nickname";
import setup_vibes from "../cmds/setup_vibes";
import refresh_vibes from "../cmds/refresh_vibes";

export default async function handleCmd({ client, command }) {
  if (!command) {
    return;
  }

  // await command.reply({ content: ':thumbsup:', ephemeral: true });

  const guild_id = command?.guildId;
  const cmd = command.commandName;
  const cmd_args = command.options.data || [];
  const from_member_id = command.member.id;

  console.log(
    `[${cmd}] FROM: discord:${
      guild_id || "dm"
    }:${from_member_id} :: OPTIONS: (${cmd_args.join(", ")})`
  );
  let handled = false;
  if (["vibesbot", "help"].includes(cmd)) {
    handled = await help({ client, command, cmd_args });
  } else if (["vibe", "vibes"].includes(cmd)) {
    handled = await vibes({ client, command, cmd_args });
  } else if (["badvibe", "badvibes", "susvibes", "susvibe"].includes(cmd)) {
    handled = await badvibes({ client, command, cmd_args });
  } else if (["vibecheck", "vibescheck", "vc"].includes(cmd)) {
    handled = vibecheck({ client, command, cmd_args });
  } else if (["reset_all_vibes"].includes(cmd)) {
    handled = reset_all_vibes({ client, command, cmd_args });
  } else if (["set_vibenomics"].includes(cmd)) {
    handled = set_vibenomics({ client, command, cmd_args });
  } else if (["set_user_vibes"].includes(cmd)) {
    handled = await set_user_vibes({ client, command, cmd_args });
  } else if (cmd === "set_vibes_nickname_template") {
    handled = await set_vibes_nickname_template({ client, command, cmd_args });
  } else if (cmd === "set_vibes_nickname") {
    handled = await set_vibes_nickname({ client, command, cmd_args });
  } else if (cmd === "set_vibes_metadata") {
    handled = await set_vibes_metadata({ client, command, cmd_args });
  } else if (cmd === "setup_vibes") {
    handled = await setup_vibes({ client, command, cmd_args, guild_id });
  } else if (cmd === "refresh_vibes") {
    handled = await refresh_vibes({ client, command, cmd_args, guild_id });
  }
  if (!command.replied) {
    if (handled && !handled?.error) {
      await command
        .reply({
          content: ":ballot_box_with_check: ok",
          ephemeral: true,
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (handled && handled?.error) {
      await command
        .reply({
          content: `:no_entry_sign: ${handled.error}`,
          ephemeral: true,
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await command
        .reply({
          content: ":bug:  something went wrong",
          ephemeral: true,
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
}
