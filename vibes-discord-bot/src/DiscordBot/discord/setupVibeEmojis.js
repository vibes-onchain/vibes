import { VIBE_EMOJIS } from "../constants";

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
      await guild.emojis
        .create(emoji.location, emoji.name)
        .then((emoji) =>
          console.log(`Created new emoji with name ${emoji.name}!`)
        )
        .catch(console.error);
    }
  }
}
