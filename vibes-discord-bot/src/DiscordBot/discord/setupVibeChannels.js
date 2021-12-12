const VIBE_CHANNELS = {
  "vibe-feed": { name: "vibe-feed", type: "GUILD_TEXT" },
}

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const channel_names = guild.channels.cache.map((i) => i.name);
  for (const channel of Object.values(VIBE_CHANNELS)) {
    if (!channel_names.includes(channel.name)) {
      await guild.channels.create(channel.name, channel)
        .then(channel => console.log(`Created new channel with name ${channel.name}!`))
        .catch(console.error);
    }
  }
}
