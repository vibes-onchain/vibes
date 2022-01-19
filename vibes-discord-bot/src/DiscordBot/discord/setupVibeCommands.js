import _ from "lodash";

const { SlashCommandBuilder } = require("@discordjs/builders");

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }

  await guild.commands.fetch();
  const appCommands = guild.commands.cache
    .map((i) => i)
    .filter((i) => i.applicationId === process.env.APP_DISCORD_APP_ID);

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
          .setName("user")
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
          .setName("user")
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
          .setName("user")
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
        option.setName("user").setDescription("who to check").setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("setvibestack")
      .setDescription("[ADMINS ONLY] set fren's vibestack")
      .addUserOption((option) =>
        option.setName("user").setDescription("who to check").setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("resetvibestacks")
      .setDescription("[ADMINS ONLY] reset everyone's vibestacks"),
    new SlashCommandBuilder()
      .setName("setvibenomics")
      .setDescription("[ADMINS ONLY] set vibenomics")
      .addStringOption((option) =>
        option
          .setName("vibenomics")
          .setDescription("vibenomics")
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("set_vibes_nickname_template")
      .setDescription(
        "[ADMINS ONLY] set descriptive paren template for nicknames"
      )
      .addStringOption((option) =>
        option.setName("template").setDescription("template").setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("set_vibes_metadata")
      .setDescription("[ADMINS ONLY] set ledger metadata for vibes")
      .addStringOption((option) =>
        option.setName("key").setDescription("key").setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("value").setDescription("value").setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("setvibestack")
      .setDescription("[ADMINS ONLY] set someone's vibestack")
      .addUserOption((option) =>
        option.setName("user").setDescription("who").setRequired(true)
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
    new SlashCommandBuilder()
      .setName("refreshvibeparens")
      .setDescription("[ADMINS ONLY] refreshvibeparens"),
  ].map((command) => command.toJSON());

  const extraCommandNames = _.difference(
    appCommands.map((i) => i.name),
    commands.map((i) => i.name)
  );
  for (const commandName of extraCommandNames) {
    const id = appCommands.find((i) => i.name === commandName)?.id;
    console.log(guild.id, "deleting old cmd", commandName);
    await guild.commands.delete(id);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  for (const command of commands) {
    console.log(guild.id, "setting up cmd", command.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await guild.commands.create(command, guild.id);
  }
}
