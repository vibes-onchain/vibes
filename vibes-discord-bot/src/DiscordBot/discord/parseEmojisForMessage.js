export default async function parseEmojisForMessage(guild_message, text) {
    const member = guild_message?.member;
    const guild = guild_message?.member?.guild;

    const vibedust_emoji =
        guild?.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

    const vibesEmoji = guild?.emojis.cache.find(
        (emoji) => emoji.name === "vibes"
    );
    const badvibes_emoji = guild?.emojis.cache.find(
        (emoji) => emoji.name === "badvibes"
    );
    const rareVibeEmoji = guild?.emojis.cache.find(
        (emoji) => emoji.name === "rarevibe"
    );
    const epicVibeEmoji = guild?.emojis.cache.find(
        (emoji) => emoji.name === "epicvibe"
    );
    const legendaryVibeEmoji = guild?.emojis.cache.find(
        (emoji) => emoji.name === "legendaryvibe"
    );
    const ogVibeEmoji = guild?.emojis.cache.find(
        (emoji) => emoji.name === "ogvibe"
    );
    const vibeFeedChannel = guild_message.guild.channels.cache.find(channel => channel.name === "vibe-feed");
    const nameToEmoji = {
        vibedustEmoji: vibedust_emoji,
        vibesEmoji: vibesEmoji,
        ogEmoji: ogVibeEmoji,
        rareEmoji: rareVibeEmoji,
        legendaryEmoji: legendaryVibeEmoji,
        epicEmoji: epicVibeEmoji,
        badvibesEmoji: badvibes_emoji,
        vibeSender: member,
        vibeFeed: `<#${vibeFeedChannel.id}>`
    };
    return text.replace(
        /\b(?:vibedustEmoji|vibesEmoji|ogEmoji|rareEmoji|legendaryEmoji|epicEmoji|badvibesEmoji|vibeSender|vibeFeed)\b/gi,
        (matched) => nameToEmoji[matched]
    );
}
