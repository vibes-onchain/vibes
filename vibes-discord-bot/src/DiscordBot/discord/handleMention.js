import { execSync } from "child_process";

import vibesbot from "../cmds/help";

export default async function handleMention({
  client,
  message,
  cmd,
  cmd_args,
}) {
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
    return vibesbot({ client, message, cmd_args });
  } else if (cmd === "gm") {
    await message.channel.send(`gm`);
  } else if (cmd === "ping") {
    await message.channel.send(`pong`);
  } else if (cmd === "world") {
    await message.channel.send(`peace`);
  } else if (cmd === "hi") {
    await message.channel.send(`hey fren`);
  } else if (cmd === "hello") {
    await message.channel.send(`hey fren`);
  } else if (cmd === "wat") {
    await message.channel.send({
      embeds: [
        {
          color: "#000000",
          description: "**Wat**",
          image: {
            url: "https://i.imgur.com/2UJmWv3.png",
          },
        },
      ],
    });
  } else if (cmd === "how") {
    await message.channel.send({
      embeds: [
        {
          color: "#000000",
          description: "**How**",
          image: {
            url: "https://i.imgur.com/2UJmWv3.png",
          },
        },
      ],
    });
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
