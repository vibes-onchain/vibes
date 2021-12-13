import _ from "lodash";

const CONTROL_BOT_ROLE = {
  name: "[Can Control Vibes Bot]",
  hoist: false,
  mentionable: false,
};

const START_GOOD_VIBE_ROLES = {
  host: false,
  mentionable: false,
  name: "[Good Vibes Start Here]",
};
const GOOD_VIBE_ROLES = [
  {
    color: 15844367,
    reason: "",
    name: "OG Vibe",
    icon: "og-vibes.png",
    hoist: true,
  },
  {
    color: 15105570,
    reason: "",
    name: "Legendary Vibe",
    hoist: true,
    icon: "legendary-vibes.png",
  },
  {
    color: 10181046,
    reason: "",
    name: "Epic Vibe",
    icon: "epic-vibes.png",
    hoist: true,
  },
  {
    color: 3447003,
    reason: "",
    name: "Rare Vibe",
    icon: "rare-vibes.png",
    hoist: true,
  },
  {
    color: 0,
    reason: "",
    name: "Frenly Vibe",
    icon: "frenly-vibes.png",
    hoist: true,
  },
];
const START_BAD_VIBE_ROLES = {
  host: false,
  mentionable: false,
  name: "[Bad Vibes Start Here]",
};
const NEG_VIBE_ROLES = [
  {
    color: 10038562,
    reason: "",
    name: "Sus Vibe",
    hoist: false,
    icon: "sus-vibes.gif",
    hoist: true,
  },
];

const BOT_ROLE_NAME =
  process.env.APP_ENV === "development" ? "vibesbot-dev" : "vibesbot";

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

//   const bot_role_position = guild.roles.cache.find(
//     (i) => i.name === BOT_ROLE_NAME
//   )?.position;

//   if (!guild.roles.cache.find((i) => i.name === CONTROL_BOT_ROLE_NAME)) {
//     await createOrUpdateRole(guild, CONTROL_BOT_ROLE, -1, true);
//   }

//   if (!guild.roles.cache.find((i) => i.name === GOOD_VIBE_ROLES_NAME)) {
//     console.log('here');
//   }

//   const gvr_role_position = guild.roles.cache.find(
//     (i) => i.name === GOOD_VIBE_ROLES_NAME
//   )?.position;

//   const bvr_role_position = guild.roles.cache.find(
//     (i) => i.name === BAD_VIBE_ROLES_NAME
//   )?.position;

//   let pos;
//   if (rel_to_bot) {
//     pos = bot_role_position + position;
//   } else {
//     pos = position;
//   }

//   if (role.position !== pos) {
//     try {
//       console.log("setPosition", pos, role.name);
//       await role.setPosition(pos);
//     } catch (e) {
//       console.log(
//         "[BOT ERROR]",
//         `Failed to update ${role.name} position in ${guild.name} ${guild.id}`
//       );
//       // console.log(e);
//     }
//   }
// }

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }

  await createOrUpdateRole(guild, CONTROL_BOT_ROLE, -1, BOT_ROLE_NAME);

  if (!findRole(guild, START_GOOD_VIBE_ROLES.name)) {
    await createOrUpdateRole(
      guild,
      START_GOOD_VIBE_ROLES,
      -1,
      CONTROL_BOT_ROLE.name
    );
  }
  for (let i = 0; i < GOOD_VIBE_ROLES.length; i++) {
    const vibeRoleAttrs = { ...GOOD_VIBE_ROLES[i] };
    await createOrUpdateRole(
      guild,
      vibeRoleAttrs,
      -1 - i,
      START_GOOD_VIBE_ROLES.name
    );
  }

  if (!findRole(guild, START_BAD_VIBE_ROLES.name)) {
    await createOrUpdateRole(guild, START_BAD_VIBE_ROLES, 0);
  }
  for (let i = 0; i < NEG_VIBE_ROLES.length; i++) {
    const vibeRoleAttrs = { ...NEG_VIBE_ROLES[i] };
    await createOrUpdateRole(
      guild,
      vibeRoleAttrs,
      -1 - i,
      START_BAD_VIBE_ROLES.name
    );
  }
}
