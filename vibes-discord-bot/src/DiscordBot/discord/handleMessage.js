export default async function handleMessage(client, message) {
      // console.log({
    //   message,
    //   member: message.member,
    //   mentions: message.mentions,
    // });
    const bot_role_id = (() => {
      const bot_as_role = message.mentions.roles.find(
        (i) => i.tags?.botId === client.user.id
      )?.id;
      if (bot_as_role) {
        return bot_as_role;
      }
      const bot_as_user = message.mentions.users.find(
        (i) => i.id === client.user.id
      )?.id;
      if (bot_as_user) {
        return bot_as_user;
      }
    })();
    const prefixRoleMention = new RegExp(`^<@&${bot_role_id}>`);
    const prefixUserMention = new RegExp(`^<@!${bot_role_id}>`);
    const prefixAtMention = new RegExp(`^<@${client.user.id}>`);
    if (
      message.content.match(prefixRoleMention) ||
      message.content.match(prefixUserMention) ||
      message.content.match(prefixAtMention)
    ) {
      await handleMention({ message });
    }
    const prefixCmdMention = /^\!([a-zA-Z0-9_]*)\s*(.*)/;
    const cmdM = message.content.match(prefixCmdMention);
    if (cmdM && GLOBAL_CMDS.indexOf(cmdM[1]) !== -1) {
      const cmd = cmdM[1];
      const cmd_args = cmdM[2].split(/[ ]+/);
      await handleCmd({ client, message, cmd, cmd_args });
    }
}