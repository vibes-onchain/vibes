const VIBE_ROLES = {
  "OG Vibe": { color: 15844367, reason: "", name: "OG Vibe" },
  "Legendary Vibe": { color: 15105570, reason: "", name: "Legendary Vibe" },
  "Epic Vibe": { color: "", reason: "", name: "Epic Vibe" },
  "Rare Vibe": { color: 3447003, reason: "", name: "Rare Vibe" },
  "Frenly Vibe": { color: 0, reason: "", name: "Frenly Vibe" },
  "Sus Vibe": { color: 10038562, reason: "", name: "Sus Vibe" },
};

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const role_names = guild.roles.cache.map((i) => i.name);
  for (const vibeRole of Object.values(VIBE_ROLES)) {
    if (!role_names.includes(vibeRole.name)) {
      console.log('creating role', vibeRole.name);
      await guild.roles.create(vibeRole);
    }
  }
}
