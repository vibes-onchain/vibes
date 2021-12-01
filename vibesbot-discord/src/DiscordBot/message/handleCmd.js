import help from "./cmds/help";
import vibes from "./cmds/vibes";
import badvibes from "./cmds/badvibes";
import setviberate from "./cmds/setviberate";
import setvibedust from "./cmds/setvibedust";
import setvibeperiod from "./cmds/setvibeperiod";
import vibedistro from "./cmds/vibedistro";
import vibecheck from "./cmds/vibecheck";
import resetvibedust from "./cmds/resetvibedust";
import setfrenlyparen from "./cmds/setfrenlyparen";
import setfrenlylabel from "./cmds/setfrenlylabel";

export default async function handleCmd({ client, message, cmd, cmd_args }) {
  const member = message.member;
  const guild = member.guild;
  const guild_members = guild.members;
  // console.log({ guild, guild_members });
  // console.log({ message, member, cmd, cmd_args });
  if (!cmd && !cmd_args) {
    cmd_args = message.content.split(" ");
    cmd_args.shift();
    cmd = cmd_args.shift();
  }
  console.log(
    `[${cmd}] FROM: discord:${guild.id}:${
      member.user.id
    } :: ARGS: (${cmd_args.join(", ")})`
  );
  if (cmd === "about" || cmd === "help") {
    return help({ message, cmd_args });
  } else if (cmd === "vibe" || cmd === "vibes") {
    return vibes({ client, message, cmd_args });
  } else if (cmd === "badvibe" || cmd === "badvibes") {
    return badvibes({ client, message, cmd_args });
  } else if (cmd === "resetvibedust") {
    return resetvibedust({ client, message, cmd_args });
  } else if (cmd === "setviberate" || cmd === "setvibestack") {
    return setviberate({ client, message, cmd_args });
  } else if (cmd === "setvibeperiod" || cmd === "setvibeprd") {
    return setvibeperiod({ client, message, cmd_args });
  } else if (cmd === "vibedistro" || cmd === "vd") {
    return vibedistro({ client, message, cmd_args });
  } else if (cmd === "setvibedust" || cmd === "genvibedust") {
    return setvibedust({ client, message, cmd_args });
  } else if (cmd === "setfrenlyparen") {
    return setfrenlyparen({ client, message, cmd_args });
  } else if (cmd === "setfrenlylabel") {
    return setfrenlylabel({ client, message, cmd_args }); 
  } else if (cmd === "vibechk" || cmd === "vibecheck" || cmd === "vc") {
    return vibecheck({ client, message, cmd_args });
  }
}
