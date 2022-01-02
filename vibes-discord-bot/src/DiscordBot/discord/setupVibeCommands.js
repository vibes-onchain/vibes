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
      .setDescription("vibebot help"),
    new SlashCommandBuilder().setName("help").setDescription("vibebot help"),
    new SlashCommandBuilder()
      .setName("vibes")
      .setDescription("vibes fren")
      .addUserOption((option) =>
        option
          .setName("fren")
          .setDescription("who you're vibing")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("note").setDescription("note")
      ),
    new SlashCommandBuilder()
      .setName("badvibes")
      .setDescription("badvibes fren")
      .addUserOption((option) =>
        option
          .setName("fren")
          .setDescription("who's being uncool")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("note").setDescription("note")
      ),
    new SlashCommandBuilder()
      .setName("susvibes")
      .setDescription("susvibes fren")
      .addUserOption((option) =>
        option
          .setName("fren")
          .setDescription("who's being uncool")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("note").setDescription("note")
      ),
    new SlashCommandBuilder()
      .setName("vibecheck")
      .setDescription("vibecheck fren")
      .addUserOption((option) =>
        option.setName("fren").setDescription("who to check").setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("setvibestack")
      .setDescription("[ADMINS ONLY] set fren's vibestack")
      .addUserOption((option) =>
        option.setName("fren").setDescription("who to check").setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("resetvibestacks")
      .setDescription("[ADMINS ONLY] reset everyone's vibestacks"),
    new SlashCommandBuilder()
      .setName("setvibenomics")
      .setDescription("[ADMINS ONLY] set vibenomics")
      .addStringOption((option) =>
        option
          .setName("vibestack")
          .setDescription("vibestack")
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("setvibestack")
      .setDescription("[ADMINS ONLY] set someone's vibestack")
      .addUserOption((option) =>
        option.setName("fren").setDescription("who").setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("vibestack")
          .setDescription("vibestack")
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("setupvibes")
      .setDescription(
        "[ADMINS ONLY] create roles, emojis, channels, and commands for your server"
      ),
  ].map((command) => command.toJSON());
  for (const command of commands) {
    console.log(guild.id, "setting up cmd", command.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await guild.commands.create(command, guild.id);
  }
}
