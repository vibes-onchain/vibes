import DiscordBot from ":/lib/DiscordBot";

export default async function (req, res) {
  const client = await DiscordBot.getClient();
  const guild = client.guilds.cache.find((g) => g.id === req.params.guild_id);
  if (!guild) {
    return res.json({ok: false, id: null, error: ["unknown guild"]});
  }
  let member = guild.members.cache.find(i => i.id === req.params.user_id);
  if (!member) {
    await guild.members.fetch(req.params.user_id).catch(e => console.log(e));
    member = guild.members.cache.find(i => i.id === req.params.user_id);
  }
  if (!member) {
    return res.json({ok: false, id: null, error: ["unknown member"]});
  }
  const user = member?.user;
  return res.json({ ok: true, id: null, result: { guild, member, user } });
}
