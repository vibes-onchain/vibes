const VIBE_CHANNELS = {
  "Vibes 101": { name: "vibes-101", type: "GUILD_TEXT" },
  "Vibenomics": { name: "vibenomics", type: "GUILD_TEXT" },
  "vibe-feed": { name: "vibe-feed", type: "GUILD_TEXT" },
};

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  let vibesCategoryChannel = guild.channels.cache.find(
    (i) => i.name === "Vibes" && i.type === "GUILD_CATEGORY"
  );
  if (!vibesCategoryChannel) {
    vibesCategoryChannel = await guild.channels.create("Vibes", {
      type: "GUILD_CATEGORY",
      permissionOverwrites: [
        {
          id: guild_id,
          allow: ["VIEW_CHANNEL"],
        },
      ],
    });
  }
  const channel_names = guild.channels.cache.map((i) => i.name);
  for (const channel of Object.values(VIBE_CHANNELS)) {
    if (!channel_names.includes(channel.name)) {
      await guild.channels
        .create(channel.name, {
          ...channel,
          parent: vibesCategoryChannel.id,
        })
        .then((channel) =>
          console.log(`Created new channel with name ${channel.name}!`)
        )
        .catch(console.error);
    }
  }
}
