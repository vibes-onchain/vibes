import help from "../cmds/help";
import vibes from "../cmds/vibes";
import badvibes from "../cmds/badvibes";
import setviberate from "../cmds/setviberate";
import setvibedust from "../cmds/setvibedust";
import setvibeperiod from "../cmds/setvibeperiod";
import vibedistro from "../cmds/vibedistro";
import vibecheck from "../cmds/vibecheck";
import resetvibedust from "../cmds/resetvibedust";
import setfrenlyparen from "../cmds/setfrenlyparen";
import setfrenlylabel from "../cmds/setfrenlylabel";

export default async function handleCmd({ client, message, cmd, cmd_args }) {
  const guild_id = message?.guild_id;

  if (!cmd && !cmd_args) {
    cmd_args = message.content.split(" ");
    cmd_args.shift();
    cmd = cmd_args.shift();
  }
  console.log(
    `[${cmd}] FROM: discord:${guild_id || 'dm'}:${message.author.id
    } :: ARGS: (${cmd_args.join(", ")})`
  );
  if (cmd === "about" || cmd === "help" || cmd === "vibesbot") {
    return help({ client, message, cmd_args });
  } else if (cmd === "vibe" || cmd === "vibes") {
    return vibes({ client, message, cmd_args });
  } else if (cmd === "badvibe" || cmd === "badvibes" || cmd === "susvibes" || cmd === "susvibe") {
    return badvibes({ client, message, cmd_args });
  } else if (cmd === "resetvibedust") {
    return resetvibedust({ client, message, cmd_args });
  } else if (cmd === "setviberate" || cmd === "setvibestack") {
    return setviberate({ client, message, cmd_args });
  } else if (cmd === "setvibeperiod" || cmd === "setvibeprd") {
    return setvibeperiod({ client, message, cmd_args });
  } else if (cmd === "vibedistro" || cmd === "vd" || cmd === "vibedistribution" || cmd === "refreshvibes") {
    return vibedistro({ client, message, cmd_args });
  } else if (cmd === "setvibedust" || cmd === "genvibedust") {
    return setvibedust({ client, message, cmd_args });
  } else if (cmd === "setvibesparen") {
    return setfrenlyparen({ client, message, cmd_args });
  } else if (cmd === "setvibeslabel") {
    return setfrenlylabel({ client, message, cmd_args });
  } else if (cmd === "vibechk" || cmd === "vibecheck" || cmd === "vc") {
    return vibecheck({ client, message, cmd_args });
  }
}
