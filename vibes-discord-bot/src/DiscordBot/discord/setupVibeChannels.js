const VIBE_CHANNELS = {
  "vibes-101": { name: "vibes-101", type: "GUILD_TEXT" },
  vibenomics: { name: "vibenomics", type: "GUILD_TEXT" },
  "vibe-feed": { name: "vibes-feed", type: "GUILD_TEXT" },
};
import { stripIndent } from "common-tags";

const VIBE_CHANNELS_MESSAGES = {
  "vibes-101": [
    stripIndent`**What**
Vibesbot is a way to record vibe signals in discord, and store them onchain.`,
    stripIndent`**Why**
Decentralized moderation becomes possible based on the vibes your community records. New members can instantly see who they should trust, and existing members can instantly flag who is too sus… even when the Mods are sleeping.`,
    {
      files: [`${__dirname}/../../../assets/images/vibes-101.png`],
      content: stripIndent`**How**`,
    },
    stripIndent`**AUA**
Join [#vibes-support](https://discord.gg/hnNqrAxYcd) in the Spotchain Discord to *ask the Vibes Team anything*. Or even just to vibe out! 
✨✨✨`,
    stripIndent`**FAQ**
***How many vibes can I send before running out?***
:robot: Infinite. Brrrrrrr.  You can send vibes as much as you want. At the end of each day, it will all get split up proportionally to the people you vibed with. So the more you send vibes, the more it cuts into tiny dusts for your receivers.:sparkles:`,
    stripIndent`​​***Do I lose my vibes by sending them to others?***
:robot: Not at all. “Your” vibes – meaning the vibes other people have sent you for showing good vibes – are placed in your ${"`"}VIBESTACK${"`"}.  This is typically what determines the vibe Level you see in your @displayname, Badges, etc. Your ${"`"}VIBESTACK${"`"} can never be spent or given away, even if you wanted to! The only way it can go down, ever, is by getting ${"`"}!susvibes${"`"}.:sparkles:`,
    stripIndent`***So if I’m not sending my vibestack, what exactly am I sending to people?***
:robot: Whenever you send vibes, you are using your daily bag of ${"`"}VIBEDUST${"`"}.  Whereas your ${"`"}VIBESTACK${"`"} can *never* be spent, your ${"`"}VIBEDUST${"`"} can *only* be spent. The bag resets each day, for you to spend again.  The only way these two things are directly related is this: in your community’s #vibenomics , your ${"`"}VIBESTACK${"`"} determines your Level, which can affect the size of your daily bag of ${"`"}VIBEDUST${"`"}.:sparkles:`,
    stripIndent`***What happens when some scammer finds a loophole in the game and gets lots of vibes for themself?***
:robot: This is a very important point – if someone finds a "loophole", and the community sees it, the community can ${"`"}!susvibe${"`"} them, closing this loophole. :sparkles: *decentralized moderation* :sparkles:`,
    stripIndent`***Can someone send vibes to themself?***
:robot: Not really. Discord allows anyone to make any reaction, but it only records to the Ledger (and counts for someone's stack) *if the vibes came from someone else*.:sparkles: `,
    stripIndent`***WTF I got vibes from someone but my display name is not changing?!***
:robot: We update as frequently as discord allows, which tends to be every few minutes.  These updates are technically all estimates, which become final at the end of each day's vibing, at the distro moment.:sparkles:`,
    stripIndent`***How can I get more vibedust from people?***
:robot: (1) show good vibes (2) pray to God of Vibes that others vibe with.:sparkles:`,
    stripIndent`***Why is my vibestack count sometimes moving around randomly in my display name?***
:robot: Until the end of your day when vibes officially distro into your ${"`"}VIBESTACK${"`"}, your display numbers are technically just a latest estimate (typically happening every few minutes). So stuff not directly related to your vibe activity can affect you, eg if people who sent you vibes are sending lots to others, diluting the dust you got.:sparkles:`,
    stripIndent`***Wut “Vibenomics”?***
:robot: Vibenomics are the Monetary Policy of vibes – the customized settings implemented by your community determining how vibes incentives work. It includes everything from: which reactions can count as vibes, to what determines levels and badges, to how much vibedust people get, to what special permissions people may get based on their vibes. Check out #vibenomics for a *totally transparent and real-time publication* of all your vibe policies.:sparkles:`,
    stripIndent`***What does it mean that my vibes have a “boost”?***
:robot: When your ${"`"}VIBESTACK${"`"} reaches new percentile ranks in your community, your vibes get the privilege of carrying a stronger signal. For example, using the high-ranking “OG-vibes" may carry a 10x boost in your community. This means that compared to the standard vibes, each of your OG-vibes will cause 10x more dust effect on the receivers. For details, check #vibenomics.:sparkles:`,
    stripIndent`***How are vibes “onchain”? Can we like see the contracts?***
:robot: All vibe activity in each community is being recorded on Spotchain (spotchain.org). It's a blockchain *specifically* built to hold crypto-based social signals.  In your #vibes-feed , you will see at the bottom of *every* transaction a link to see that Tx on a Spot Ledger. Join the Spotchain discord if you’re interested in diving deeper into the chain stuff: https://discord.gg/7H3NWMjUyY . :sparkles:`,
  ],
  vibenomics: [
    stripIndent`***Wen token?***
  :robot: Stop it you! Vibes are *pure* and totally *non-financial*. And not in a “we're not liable” way. If we involve money in vibe signals, then the vibes start to indicate wealth, and not vibes. There’s already plenty of that out there. That’s not what we want to help people share and show and see. No buying or selling vibes, ever.:sparkles:
     
     
  ***VIBELEVEL***                      **VIBESTACK**
  :warning: Sus Vibes                     negative
  :green_square: Good Vibes                     positive
  :blue_square: Cool Vibes                     69.15 - 84.15 %tile
  :purple_square: Groovy Vibes                     84.15 - 93.32 %tile
  :orange_square: Trippy Vibes                     93.32 - 97.72 %tile
  :yellow_square: Shamanic Vibes                     97.72 - 99.99 %tile
     
     
  ***VIBES BADGES***
  1 - 10 🌱 
  10 - 50 🌱 🌱
  50 - 200 🌱 🌱 🌱
  200 - 500 🍄 
  500 - 1000 🍄 🍄 
  1000 - 2500 🍄 🍄 🍄 
  2500+ 🌈
  2500+ and above 90%tile 🌈 🌈 
  2500+ and above 95%tile 🌈 🌈 🌈 
  2500+ and above 98%tile ☮️
     
     
  ***⁚⁛⁚⁛VIBEDUST DAILY BAGS💰⁚⁛⁚⁛***
  SHAMANIC                     50 p/day
  TRIPPY                     40 p/day
  GROOVY                     30 p/day
  COOL                     20 p/day
  GOOD                     10 p/day
  SUS                     0 p/day
  `,
  ],
  "vibes-feed": [],
};

// What  / Why / How [image] / AUA / FAQ

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  let vibesCategoryChannel = guild.channels.cache.find(
    (i) => i.name === "Vibes" && i.type === "GUILD_CATEGORY"
  );
  if (!vibesCategoryChannel) {
    vibesCategoryChannel = await guild.channels.create("Vibes", {
      type: "GUILD_CATEGORY",
      permissionOverwrites: [
        {
          id: guild_id,
          allow: ["VIEW_CHANNEL"],
        },
      ],
    });
  }
  const channel_names = guild.channels.cache.map((i) => i.name);
  for (const channel_values of Object.values(VIBE_CHANNELS)) {
    if (!channel_names.includes(channel_values.name)) {
      const channel = await guild.channels
        .create(channel_values.name, {
          ...channel_values,
          parent: vibesCategoryChannel.id,
        })
        .then((channel) => {
          console.log(`Created new channel with name ${channel.name}!`);
          return channel;
        })
        .catch(console.error);
      for (const msg of VIBE_CHANNELS_MESSAGES[channel.name]) {
        await channel.send(msg);
      }
    }
  }
}
