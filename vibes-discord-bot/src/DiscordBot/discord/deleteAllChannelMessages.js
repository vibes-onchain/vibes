export default async function ({ client, guild_id, channel_name }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const channel = guild.channels.cache.find((i) => i.name === channel_name);
  const messages = await channel.messages.fetch({ limit: 100 });
  console.log(`Received ${messages.size} messages`);
  //Iterate through the messages here with the variable "messages".
  for (const [_id, message] of messages) {
    console.log({message});
    await message.delete();
  }
  return true;
}
