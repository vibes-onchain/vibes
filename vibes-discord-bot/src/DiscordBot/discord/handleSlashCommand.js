import help from "../cmds/help";

import vibes from "../cmds/vibes";
import badvibes from "../cmds/badvibes";
import vibecheck from "../cmds/vibecheck";

import setvibestack from "../cmds/setvibestack";
import setvibenomics from "../cmds/setvibenomics";
import resetvibestacks from "../cmds/resetvibestacks";

import setvibesparen from "../cmds/setvibesparen";
import setvibestrait from "../cmds/setvibestrait";

import setupvibes from "../cmds/setupvibes";

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
    // } else if (["vibecheck", "vibescheck", "vc"].includes(cmd)) {
    //   return vibecheck({ client, message, cmd_args });
    // } else if (["resetvibestacks"].includes(cmd)) {
    //   return resetvibestacks({ client, message, cmd_args });
    // } else if (["setvibenomics"].includes(cmd)) {
    //   return setvibenomics({ client, message, cmd_args });
    // } else if (["setvibestack"].includes(cmd)) {
    //   return setvibestack({ client, message, cmd_args });
    // } else if (cmd === "setvibesparen") {
    //   return setvibesparen({ client, message, cmd_args });
    // } else if (cmd === "setvibestrait") {
    //   return setvibestrait({ client, message, cmd_args });
    } else if (cmd === "setupvibes") {
      handled = await setupvibes({ client, command, cmd_args, guild_id });
  }
  if (!command.replied) {
    if (handled && !handled?.error) {
      await command.reply({
        content: ":ballot_box_with_check: ok",
        ephemeral: true,
      });
    } else if (handled && handled?.error) {
      await command.reply({
        content: `:no_entry_sign: ${handled.error}`,
        ephemeral: true,
      });
    } else {
      await command.reply({
        content: ":bug:  something went wrong",
        ephemeral: true,
      });
    }
  }
}
