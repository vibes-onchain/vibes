export default async function sendQuickCommandResponse({command, error}) {
  if (command && !command.replied) {
    if (!error) {
      await command
        .reply({
          content: ":gear: running command",
          ephemeral: true,
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (error) {
      await command
        .reply({
          content: `:no_entry_sign: ${handled.error}`,
          ephemeral: true,
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
}