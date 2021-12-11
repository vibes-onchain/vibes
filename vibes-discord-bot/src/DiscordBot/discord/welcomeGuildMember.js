export default async function welcomeGuildMember(client, guild_id, membe) {
  const welcomeEmbed = new Discord.MessageEmbed();

  welcomeEmbed.setColor("#5cf000");
  welcomeEmbed.setTitle("** Welcome Vibes **");
  welcomeEmbed.setImage("https://i.imgur.com/c76UqNN.gif");

  await member.send(welcomeEmbed);
}
