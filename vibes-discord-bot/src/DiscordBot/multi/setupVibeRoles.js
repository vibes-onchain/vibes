import _ from "lodash";

import {
  CAN_CONTROL_VIBES_BOT_ROLE,
  GOOD_VIBES_START_HERE_ROLE,
  GOOD_VIBE_ROLES,
  BAD_VIBES_START_HERE_ROLE,
  BAD_VIBE_ROLES,
  VIBES_BOT_ROLE_NAME,
} from "../constants";

import getVibeRoleAliases from "../spothub/getVibeRoleAliases";

const iconsDir = `${__dirname}/../../../assets/icons`;

async function createOrUpdateRole(guild, attrs, position, rel_to_name = null) {
  const role_names = guild.roles.cache.map((i) => i.name);
  if (!role_names.includes(attrs.name)) {
    await guild.roles.create(
      _.pick(attrs, ["name", "hoist", "mentionable", "color", "reason"])
    );
  }

  // TODO issue role.setIcon is not a function
  // if (attrs.icon) {
  //   await role.setIcon(`${iconsDir}/${attrs.icon}`);
  // }

  const role = guild.roles.cache.find((i) => i.name === attrs.name);
  if (!role) {
    return;
  }

  let pos = position;
  if (rel_to_name) {
    const rel_position = guild.roles.cache.find(
      (i) => i.name === rel_to_name
    )?.position;
    pos = position + rel_position;
  }

  if (role.position !== pos) {
    try {
      console.log("setPosition", pos, role.name);
      await role.setPosition(pos);
    } catch (e) {
      console.log(
        "[BOT ERROR]",
        `Failed to update ${role.name} position in ${guild.name} ${guild.id}`
      );
      // console.log(e);
    }
  }

  return role;
}

const findRole = function (guild, name) {
  return guild.roles.cache.find((i) => i.name === name);
};

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }

  await createOrUpdateRole(
    guild,
    CAN_CONTROL_VIBES_BOT_ROLE,
    -1,
    VIBES_BOT_ROLE_NAME
  );

  if (!findRole(guild, GOOD_VIBES_START_HERE_ROLE.name)) {
    await createOrUpdateRole(
      guild,
      GOOD_VIBES_START_HERE_ROLE,
      -1,
      CAN_CONTROL_VIBES_BOT_ROLE.name
    );
  }

  const role_aliases = await getVibeRoleAliases({ guild_id });

  for (let i = 0; i < GOOD_VIBE_ROLES.length; i++) {
    const vibeRoleAttrs = { ...GOOD_VIBE_ROLES[i] };
    if (role_aliases[vibeRoleAttrs.name]) {
      vibeRoleAttrs.name = role_aliases[vibeRoleAttrs.name];
    }
    console.log(vibeRoleAttrs);
    await createOrUpdateRole(
      guild,
      vibeRoleAttrs,
      -1 - i,
      GOOD_VIBES_START_HERE_ROLE.name
    );
  }

  if (!findRole(guild, BAD_VIBES_START_HERE_ROLE.name)) {
    await createOrUpdateRole(guild, BAD_VIBES_START_HERE_ROLE, 0);
  }
  for (let i = 0; i < BAD_VIBE_ROLES.length; i++) {
    const vibeRoleAttrs = { ...BAD_VIBE_ROLES[i] };
    if (role_aliases[vibeRoleAttrs.name]) {
      vibeRoleAttrs.name = role_aliases[vibeRoleAttrs.name];
    }
    await createOrUpdateRole(
      guild,
      vibeRoleAttrs,
      -1 - i,
      BAD_VIBES_START_HERE_ROLE.name
    );
  }
}
