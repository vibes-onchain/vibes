import formatNumber from ":/lib/formatNumber";

const removeAllRoles = (member, guild) => {
  ["Rare Vibe", "Epic Vibe", "Legendary Vibe", "OG Vibe"].map((roleName) => {
    const role = guild.roles.cache.find((role) => role.name === roleName);
    if (role) {
      member.roles.remove(role);
    }
  });
};

const removeAllRolesAndAddRoleName = async (member, guild, role_name) => {
  ["Rare Vibe", "Epic Vibe", "Legendary Vibe", "OG Vibe"]
    .filter((i) => i !== role_name)
    .map((roleName) => {
      const role = guild.roles.cache.find((role) => role.name === roleName);
      if (role) {
        member.roles.remove(role);
      }
    });
  const role = guild.roles.cache.find((role) => role.name === role_name);
  if (role) {
    member.roles.add(role);
  }
};

function evalFrenlyParen(paren, context) {
  if (!paren) {
    paren = "{vibedust}";
  }
  for (const [key, value] of Object.entries(context)) {
    paren = paren.replaceAll(`{${key}}`, value);
  }
  return paren;
}

export default async function updateGuildMember({
  client,
  guild,
  member,
  vibes,
  user_id,
  frenly_paren,
  frenly_labels,
}) {
  if (member === undefined) {
    member = guild.members.cache.find((m) => m.user.id === user_id);
  }
  vibes = vibes || 0;

  if (!member || !member.user) {
    return;
  }

  const context = {};
  context["vibedust"] = formatNumber(vibes, "decimal2f");
  for (const [label, users_labels] of Object.entries(frenly_labels)) {
    context[label] = users_labels[member.user.id] || '';
  }

  // don't style our bots nickname
  if (member.user.id === client.user.id || member.user.bot) {
    await member.setNickname(`${member.user.username}`).catch((e) => {
      console.log(e);
    });
    removeAllRoles(member, guild);
    return;
  }

  if (vibes < 0) {
    await member
      .setNickname(
        `${member.user.username} (${evalFrenlyParen(frenly_paren, context)})`
      )
      .catch((e) => {
        console.log(e);
      });
    removeAllRoles(member, guild);
  } else if (vibes < 100) {
    await member
      .setNickname(
        `${member.user.username} (${evalFrenlyParen(frenly_paren, context)})`
      )
      .catch((e) => {
        console.log(e);
      });
    removeAllRoles(member, guild);
  } else if (vibes < 200) {
    await member
      .setNickname(
        `${member.user.username} (${evalFrenlyParen(frenly_paren, context)})`
      )
      .catch((e) => {
        console.log(e);
      });
    await removeAllRolesAndAddRoleName(member, guild, "Rare Vibe");
  } else if (vibes >= 200 && vibes < 300) {
    await member
      .setNickname(
        `${member.user.username} (${evalFrenlyParen(frenly_paren, context)})`
      )
      .catch((e) => {});
    await removeAllRolesAndAddRoleName(member, guild, "Epic Vibe");
  } else if (vibes >= 300 && vibes < 400) {
    await member
      .setNickname(
        `${member.user.username} (${evalFrenlyParen(frenly_paren, context)})`
      )
      .catch((e) => {});
    removeAllRolesAndAddRoleName(member, guild, "Legendary Vibe");
  } else if (vibes >= 400) {
    await member
      .setNickname(
        `${member.user.username} (${evalFrenlyParen(frenly_paren, context)})`
      )
      .catch((e) => {});
    await removeAllRolesAndAddRoleName(member, guild, "OG Vibe");
  }
}
