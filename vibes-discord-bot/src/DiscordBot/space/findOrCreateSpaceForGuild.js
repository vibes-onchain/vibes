import Ledger from "spotspace/lib/Ledger";

export default async function findOrCreateSpaceForGuild(guild_id, guild_name) {
  const [space, _was_created] = await Ledger.findOrCreate({
    where: { meta: { discord_guild_id: guild_id } },
    defaults: {
      // name: guild_name,
      meta: { discord_guild_id: guild_id },
    },
  });
  if (!space.name && guild_name) {
    space.name = guild_name;
  }
  space.meta = { ...space.meta, discord_guild_id: guild_id };
  await space.save();
  return space; 
}