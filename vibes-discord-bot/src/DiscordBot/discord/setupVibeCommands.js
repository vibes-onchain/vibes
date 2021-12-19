const { SlashCommandBuilder } = require("@discordjs/builders");

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }

  const commands = [
    new SlashCommandBuilder()
      .setName("vibesbot")
      .setDescription("vibes help"),

    new SlashCommandBuilder()
      .setName("vibe")
      .setDescription("vibe fren")
      .addUserOption((option) =>
        option
          // .setType("MENTIONABLE")
          .setName("fren")
          .setDescription("who you're vibing")
          .setRequired(true)
      )

      .addStringOption((option) =>
        option.setName("reason").setDescription("reason")
      ),
    new SlashCommandBuilder()
      .setName("susvibe")
      .setDescription("susvibe fren")
      .addUserOption((option) =>
        option
          // .setType("MENTIONABLE")
          .setName("fren")
          .setDescription("who is giving you a sus vibe")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("reason").setDescription("reason")
      ),
    new SlashCommandBuilder()
      .setName("badvibe")
      .setDescription("badvibe fren")
      .addUserOption((option) =>
        option
          // .setType("MENTIONABLE")
          .setName("fren")
          .setDescription("who is giving you a bad vibe")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("reason").setDescription("reason")
      ),
  ].map((command) => command.toJSON());
  for (const command of commands) {
    await guild.commands.create(command, guild.id);
  }
}
