import DiscordBot from ":/lib/DiscordBot";

export default async function (req, res) {
  const client = await DiscordBot.getClient();
  let user = client.users.cache.find(i => i.id === req.params.user_id);
  if (!user) {
    await client.users.fetch(req.params.user_id).catch(e => console.log(e));
    user = client.users.cache.find(i => i.id === req.params.user_id);
  }
  if (!user) {
    return res.json({ok: false, id: null, error: ["unknown user"]});
  }
  return res.json({ ok: true, id: null, result: { user } });
}
