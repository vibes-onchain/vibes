const iconsDir = `${__dirname}/../../../assets/icons`;

const VIBE_EMOJIS = {
  "susvibe": { location: `${iconsDir}/sus-vibes.gif`, name: "susvibe" },
  "ogvibe": { location: `${iconsDir}/og-vibes.png`, name: "ogvibe" },
  "epicvibe": { location: `${iconsDir}/epic-vibes.png`, name: "epicvibe" },
  "rarevibe": { location: `${iconsDir}/rare-vibes.png`, name: "rarevibe" },
  "legendaryvibe": { location: `${iconsDir}/legendary-vibes.png`, name: "legendaryvibe" },
  "frenlyvibe": { location: `${iconsDir}/frenly-vibes.png`, name: "frenlyvibe" },
  "vibes": { location: `${iconsDir}/frenly-vibes.png`, name: "vibes" },
  "vibe": { location: `${iconsDir}/frenly-vibes.png`, name: "vibe" },
  "vibedust": { location: `${iconsDir}/vibedust.gif`, name: "vibedust" },
}

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const emoji_names = guild.emojis.cache.map((i) => i.name);
  for (const emoji of Object.values(VIBE_EMOJIS)) {
    if (!emoji_names.includes(emoji.name)) {
      await guild.emojis.create(emoji.location, emoji.name)
        .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
        .catch(console.error);
    }
  }
}
