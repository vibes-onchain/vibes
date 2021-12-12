import _ from "lodash";

const CONTROL_BOT_ROLE = {
  name: "__CanControlVibesBot__",
  hoist: false,
  mentionable: false,
};
const VIBE_ROLES = [
  { color: 15844367, reason: "", name: "OG Vibe", icon: "og-vibes.png" },
  {
    color: 15105570,
    reason: "",
    name: "Legendary Vibe",
    icon: "legendary-vibes.png",
  },
  { color: 10181046, reason: "", name: "Epic Vibe", icon: "epic-vibes.png" },
  { color: 3447003, reason: "", name: "Rare Vibe", icon: "rare-vibes.png" },
  { color: 0, reason: "", name: "Frenly Vibe", icon: "frenly-vibes.png" },
];
const NEG_VIBE_ROLES = [
  {
    color: 10038562,
    reason: "",
    name: "Sus Vibe",
    hoist: false,
    icon: "sus-vibes.gif",
  },
];

const BOT_ROLE_NAME =
  process.env.APP_ENV === "development" ? "vibesbot-dev" : "vibesbot";

const iconsDir = `${__dirname}/../../../assets/icons`;

async function createOrUpdateRole(guild, attrs, position, rel_to_bot = false) {
  const bot_role_position = guild.roles.cache.find(
    (i) => i.name === BOT_ROLE_NAME
  )?.position;
  const role_names = guild.roles.cache.map((i) => i.name);
  if (!role_names.includes(attrs.name)) {
    await guild.roles.create(
      _.pick(attrs, ["name", "hoist", "mentionable", "color", "reason"])
    );
  }
  const role = guild.roles.cache.find((i) => i.name === attrs.name);
  if (!role) {
    return;
  }

  // TODO issue role.setIcon is not a function
  // if (attrs.icon) {
  //   await role.setIcon(`${iconsDir}/${attrs.icon}`);
  // }

  let pos;
  if (rel_to_bot) {
    pos = bot_role_position + position;
  } else {
    pos = position;
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
}

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }

  await createOrUpdateRole(guild, CONTROL_BOT_ROLE, -1, true);

  for (let i = 0; i < VIBE_ROLES.length; i++) {
    const vibeRoleAttrs = { ...VIBE_ROLES[i] };
    await createOrUpdateRole(guild, vibeRoleAttrs, -2 - i, true);
  }

  for (let i = 0; i < NEG_VIBE_ROLES.length; i++) {
    const vibeRoleAttrs = { ...NEG_VIBE_ROLES[i] };
    await createOrUpdateRole(guild, vibeRoleAttrs, i, 0);
  }
}
