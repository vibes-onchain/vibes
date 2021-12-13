import { execSync } from "child_process";

import help from '../cmds/help';

export default async function handleMention({ client, message, cmd, cmd_args }) {
  const member = message.member;
  const guild = member.guild;
  const guild_members = guild.members;
  const canControlFrenlyBot = member.roles.cache.some(
    (role) => role.name === "[Can Control Vibes Bot]"
  )
    ? true
    : false;

  if (!cmd && !cmd_args) {
    cmd_args = message.content.split(" ");
    cmd_args.shift();
    cmd = cmd_args.shift();
  }
  if (cmd === "help") {
    return help({ client, message, cmd_args });
  } else if (cmd === "gm") {
    await message.channel.send(`gm`);
  } else if (cmd === "refresh" && canControlFrenlyBot) {
    // for (const [member_id, member] of guild_members.cache) {
    //   const user = await DiscordDevKeyValue.findOrCreateMember(member);
    //   console.log(member.user.username, user.value);
    //   if (member.user.bot) {
    //     await member.setNickname(`${member.user.username}`).catch((e) => {});
    //   } else {
    //     try {
    //       await updateGuildMember({
    //         guild: guild,
    //         member: member,
    //         vibes: user.value.vibes || 0,
    //       });
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // }
  } else if (cmd === "info" && process.env.APP_ENV === "development") {
    const username = execSync(`git config user.email`).toString().trim();
    const latest_commit = execSync(`git log --pretty=oneline -1`)
      .toString()
      .trim();
    await message.channel.send(
      `username: ${username}
latest_commit: ${latest_commit}​`
    );
  } else if (cmd === "killall" && process.env.APP_ENV === "development") {
    const username = execSync(`git config user.email`).toString().trim();
    await message.channel.send(
      `dying inside... and out ​​🤖​​➡️​🚪​ (${username})`
    );
    process.kill(process.pid, "SIGINT");
  }
}
