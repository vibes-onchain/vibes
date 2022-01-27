import updateGuildMember from "./updateGuildMember";
import _ from 'lodash';

const STATUS_PRIORITY = {
  "online": 1,
  "idle": 2,
  "dnd": 3,
  "offline": 4,
  [null]: 5,
  [undefined]: 5,
}

export default async function updateAllGuildMembers({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const all_guild_members = guild.members.cache.map((i) => i);
  const sorted_guild_members = _.sortBy(all_guild_members, i => STATUS_PRIORITY[i.presence?.status]);
  for (const member of sorted_guild_members) {
    try {
      const skipIfUnknown = true;
      const changed = await updateGuildMember({
        client,
        guild_id,
        member_id: member.id,
        skipIfUnknown
      });
      if (changed) {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 500);
        });
      }
    } catch(e) {
      console.log(e);
    }
  }
}
