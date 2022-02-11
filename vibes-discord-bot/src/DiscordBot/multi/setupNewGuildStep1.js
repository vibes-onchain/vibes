import getGuildStuff from "../discord/getGuildStuff";
import doSleep from ":/lib/doSleep";

const LITTLE_SLEEP = 2000;

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const { vibesConfigChannel } = getGuildStuff({ client, guild_id });
  if (!vibesConfigChannel) {
    return true;
  }

  await vibesConfigChannel.send(
    "awesome, i'll set up channels, roles, and emojis :sparkles: :warning:"
  );
  await doSleep(LITTLE_SLEEP);
  await vibesConfigChannel.send("time for some vibenomics");
  await doSleep(LITTLE_SLEEP);
  if (guild.memberCount > 150) {
    await vibesConfigChannel.send("hm... you got quite the crowd in here.");
    await doSleep(LITTLE_SLEEP);
    await vibesConfigChannel.send(
      "let's weight vibes toward trusted members and let others earn theirs."
    );
    await doSleep(LITTLE_SLEEP*3);
    await vibesConfigChannel.send(
      "!set_vibenomics CASE WHEN vibestack > 100 THEN 10 WHEN vibestack > 10 THEN 5 WHEN vibestack >= 0 THEN 1 ELSE 0 END"
    );
    await doSleep(LITTLE_SLEEP);
    await vibesConfigChannel.send(`!set_user_vibes <@!${guild.ownerId}> 250`);
    await doSleep(LITTLE_SLEEP*2);
    await vibesConfigChannel.send('you can use the !set_user_vibes above to set the initial vibes of other trusted members');
    await doSleep(LITTLE_SLEEP);
  } else {
    await vibesConfigChannel.send(
      "you can change your vibenomics anytime, but let's start off easy"
    );
    await doSleep(LITTLE_SLEEP);
    await vibesConfigChannel.send(
      "everyone gets 20g of vibedust to share each day"
    );
    await doSleep(LITTLE_SLEEP);
    await vibesConfigChannel.send("!set_vibenomics 20");
    await doSleep(LITTLE_SLEEP);
  } 
  await vibesConfigChannel.send("looks like you're all set");
  await doSleep(LITTLE_SLEEP);
  await vibesConfigChannel.send("ooh, if you want me to display vibe levels next to usernames, remember that you'll need place the role called `vibesbot` above other roles")
  await doSleep(LITTLE_SLEEP);
  await vibesConfigChannel.send("for example, if you place the vibesbot role at the top of your server roles, then i'll be able to add vibe levels next to everyone except for the server owner's name");
  await doSleep(LITTLE_SLEEP);
  await vibesConfigChannel.send("alright, one more thing...");
  await vibesConfigChannel.send(`!vibes <@!${guild.ownerId}>`);
  return true;
}
