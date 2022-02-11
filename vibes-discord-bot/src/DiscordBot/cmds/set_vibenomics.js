import messageVibeFeedChannel from "../discord/messageVibeFeedChannel";
import setVibenomics from "../spothub/setVibenomics";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import canControlVibesBot from "../discord/canControlVibesBot";

export default async function set_vibenomics({
  client,
  command,
  message,
  cmd_args,
}) {
  const member = message ? message.member : command.member;
  const guild = member.guild;
  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  if (
    !(await canControlVibesBot({
      client,
      guild_id: guild.id,
      member_id: member?.id,
    }))
  ) {
    return { error: "you must be a vibesbot admin" };
  }

  const viberate_str = command
    ? cmd_args.find((i) => i.name === "vibenomics")?.value
    : cmd_args.join(" ");
  await setVibenomics(ledger.id, viberate_str, member.id);

  const vibedust_emoji = "✨";

  let viberateEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji}  Vibenomics Changed  ${vibedust_emoji}${vibedust_emoji}`,
    url: `${process.env.VIBES_LIVE_BASE_URL}/ledger/${ledger_id}`,
    description: `Daily vibenomic policy set to:
    
    \`${viberate_str}\`
    
    Each member's daily vibe dust bag size will be based on the formula above.

    Get lots more vibe analytics on ***vibes.app***!`,
    image: {
      url: "https://media1.giphy.com/media/3owzW5c1tPq63MPmWk/giphy.gif?cid=ecf05e47aqgiqppc36lyfbzyuax1w8wf27k01hbkl875lf1f&rid=giphy.gif&ct=g",
    },
  };
  await messageVibeFeedChannel(guild, { embeds: [viberateEmbed] });

  return true;
}
