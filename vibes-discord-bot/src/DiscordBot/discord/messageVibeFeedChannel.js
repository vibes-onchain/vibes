export default async function messageVibeFeedChannel(guild, message) {
  const feedChannel = guild.channels.cache.find((i) => i.name === "vibe-feed");
  await feedChannel?.send(message).catch((e) => {
    console.log(e);
  });
}
