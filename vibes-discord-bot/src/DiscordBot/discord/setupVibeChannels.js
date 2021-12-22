const VIBE_CHANNELS = {
  "vibes-101": { name: "vibes-101", type: "GUILD_TEXT" },
  vibenomics: { name: "vibenomics", type: "GUILD_TEXT" },
  "vibe-feed": { name: "vibe-feed", type: "GUILD_TEXT" },
};

const VIBE_CHANNELS_MESSAGES = {
  "vibes-101": [
    {
      files: [
        `${__dirname}/../../../assets/images/vibes-101.png`,
      ],
    },
  ],
  vibenomics: [],
  "vibe-feed": [],
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
  for (const channel_values of Object.values(VIBE_CHANNELS)) {
    if (!channel_names.includes(channel_values.name)) {
      const channel = await guild.channels
        .create(channel_values.name, {
          ...channel_values,
          parent: vibesCategoryChannel.id,
        })
        .then((channel) => {
          console.log(`Created new channel with name ${channel.name}!`);
          return channel;
        })
        .catch(console.error);
      for (const msg of VIBE_CHANNELS_MESSAGES[channel.name]) {
        await channel.send(msg);
      }
    }
  }
}
