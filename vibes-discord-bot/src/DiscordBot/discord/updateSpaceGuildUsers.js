export default async function updateSpaceGuildUsers(client, space_id) {
  const space = await Space.findOne({ where: { id: space_id } });
  const guild_id = space.meta?.discord_guild_id;
  if (guild_id) {
    const guild = await client.guilds.cache.find((g) => g.id === guild_id);
    const users_vibes = await DiscordGuild.recountSpaceVibes(space_id);
    for (const [member_id, member] of guild.members.cache) {
      if (Object.keys(users_vibes).indexOf(member.user.id) === -1) {
        await updateGuildMember({
          client,
          guild,
          user_id: member.user?.id,
          vibes: 0,
          frenly_labels: space.meta?.frenly_labels,
          frenly_paren: space.meta?.frenly_paren,
        });
      }
    }
    for (const [user_id, vibes] of Object.entries(users_vibes)) {
      await updateGuildMember({
        client,
        guild,
        user_id,
        vibes,
        frenly_labels: space.meta?.frenly_labels,
        frenly_paren: space.meta?.frenly_paren,
      });
    }
  }
}
