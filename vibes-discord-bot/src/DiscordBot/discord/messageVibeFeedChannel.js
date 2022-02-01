export default async function messageVibeFeedChannel(guild, message) {
  const feedChannel = guild.channels.cache.find((i) => i.name === "vibes-feed");
  await feedChannel?.send(message).catch((e) => {
    console.log(e);
  });
}
