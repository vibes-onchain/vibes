import { VIBE_ROLE_NAMES } from "../constants";
import getVibeFeed from "./getVibeFeed";
import { stripIndent } from "common-tags";
import getMemberDetails from "../multi/getMemberDetails";
export default async function updateGuildMemberVibeRole({
  client,
  guild_id,
  member_id,
  role_name,
}) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  if (!member_id) {
    throw new Error("needs member_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  const vibeFeed = await getVibeFeed({ client, guild_id });

  if (!guild) {
    throw new Error("guild not found");
  }
  const member = guild.members.cache.find((i) => i.id === member_id);
  const updating_member = await getMemberDetails({
    client,
    guild_id,
    member_id: member.id,
  });

  let didUpdate = false;
  // console.log("my roles");
  for (const role of member.roles.cache.map((i) => i)) {
    // console.log(role.name);
    if (VIBE_ROLE_NAMES.includes(role.name) && role_name !== role.name) {
      console.log("removing", role.name);

      await member.roles.remove(role);
      didUpdate = true;
    }
  }
  const in_role = member.roles.cache.find((role) => role.name === role_name);
  if (!in_role) {
    const role = guild.roles.cache.find((role) => role.name === role_name);
    if (role) {
      if (role.name === "Sus Timeout") {
        let vibe_level_ascii = "˙";
        if (updating_member.vibe_level == 1) {
          vibe_level_ascii = "˙";
        } else if (updating_member.vibe_level == 2) {
          vibe_level_ascii = "‧⁚";
        } else if (updating_member.vibe_level == 3) {
          vibe_level_ascii = "⁛⁚";
        } else if (updating_member.vibe_level == 4) {
          vibe_level_ascii = "⁚⁛⁚";
        } else if (updating_member.vibe_level == 5) {
          vibe_level_ascii = "⁛⁚⁛⁚";
        }
        await vibeFeed.send({
          embeds: [
            {
              color: "#c8354a",
              description: stripIndent`${"`"}!SUS-TIMEOUT${"`"}${vibe_level_ascii}🔕<@${
                member.id
              }>
                *Mods to review reinstatement...*
                **[notion.so →](https://vibes-docs.notion.site/How-does-Sus-Timeout-work-920bb4f91be148d4bebf644d2c38d018)**`,
            },
          ],
        });
      }
      await member.roles.add(role);
      didUpdate = true;
    }
  }
  return didUpdate;
}
