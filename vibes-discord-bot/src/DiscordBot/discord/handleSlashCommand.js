import vibesbot from "../cmds/vibesbot";

export default async function handleCmd({ client, command }) {
  if (!command) { return; }

  await command.reply({ content: ':thumbsup:', ephemeral: true });

  const guild_id = command?.guildId;
  const cmd = command.commandName;
  const cmd_args = command.options.data || [];
  const from_member_id = command.member.id;

  console.log(
    `[${cmd}] FROM: discord:${guild_id || "dm"}:${from_member_id
    } :: OPTIONS: (${cmd_args.join(", ")})`
  );
  if (cmd === "about" || cmd === "help" || cmd === "vibesbot") {
    return vibesbot({ client, message: command, cmd_args });
    // } else if (cmd === "vibe" || cmd === "vibes") {
    //   return vibes({ client, message: command, cmd_args });
    // } else if (
    //   cmd === "badvibe" ||
    //   cmd === "badvibes" ||
    //   cmd === "susvibes" ||
    //   cmd === "susvibe"
    // ) {
    //   return badvibes({ client, message, cmd_args });
    // } else if (cmd === "resetvibedust") {
    //   return resetvibedust({ client, message, cmd_args });
    // } else if (cmd === "setviberate" || cmd === "setvibestack" || cmd === "setvibestacks") {
    //   return setviberate({ client, message, cmd_args });
    // } else if (cmd === "setvibeperiod" || cmd === "setvibeprd") {
    //   return setvibeperiod({ client, message, cmd_args });
    // } else if (
    //   cmd === "vibedistro" ||
    //   cmd === "vd" ||
    //   cmd === "vibedistribution" ||
    //   cmd === "refreshvibes"
    // ) {
    //   return vibedistro({ client, message, cmd_args });
    // } else if (cmd === "setvibedust" || cmd === "genvibedust") {
    //   return setvibedust({ client, message, cmd_args });
    // } else if (cmd === "setvibesparen") {
    //   return setvibesparen({ client, message, cmd_args });
    // } else if (cmd === "setvibestrait") {
    //   return setvibestrait({ client, message, cmd_args });
    // } else if (cmd === "setupvibes") {
    //   return setupvibes({ client, message, cmd_args, guild_id }); 
    // } else if (cmd === "vibechk" || cmd === "vibecheck" || cmd === "vc") {
    //   return vibecheck({ client, message, cmd_args });
  }
}
