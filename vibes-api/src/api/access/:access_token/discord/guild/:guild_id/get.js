import DiscordBot from ":/lib/DiscordBot";

export default async function (req, res) {
  const client = await DiscordBot.getClient();
  const guild = client.guilds.cache.find((g) => g.id === req.params.guild_id);
  return res.json({ ok: true, id: null, result: { guild } });
}
