import Eris, { Message, TextChannel } from "eris";
import { getMessageUrl, isFirstEmoji } from "./functions";

require("dotenv").config();
// Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

const discordToken = process.env.RETTAR5_DISCORD_MEIGEN_BOT_TOKEN;
if (!discordToken) {
  console.error(
    'Could not find of discord bot token.\nPlease set environment variables of "RETTAR5_DISCORD_MEIGEN_BOT_TOKEN".'
  );
  process.exit(1);
}

const channelId = process.env.RETTAR5_DISCORD_MEIGEN_BOT_CHANNEL_ID;
if (!channelId) {
  console.error(
    'Could not find of channel id.\nPlease set environment variables of "RETTAR5_DISCORD_MEIGEN_BOT_CHANNEL_ID".'
  );
  process.exit(1);
}

const emojiName = process.env.RETTAR5_DISCORD_MEIGEN_BOT_EMOJI_NAME;
if (!emojiName) {
  console.error(
    'Could not find of emoji name.\nPlease set environment variables of "RETTAR5_DISCORD_MEIGEN_BOT_EMOJI_NAME".'
  );
  process.exit(1);
}

const bot = Eris(discordToken);

bot.on("ready", () => {
  console.log("Ready!");
});

bot.on("messageReactionAdd", async (_message: Message, emoji: any) => {
  const message = await bot.getMessage(_message.channel.id, _message.id);
  if (
    (message?.channel as TextChannel)?.name !== channelId &&
    emoji?.name === emojiName &&
    isFirstEmoji(message, emojiName)
  ) {
    const reprintMessage = `${message.content} / ${
      message.author?.username
    }\n${getMessageUrl(message)}`;
    await bot.createMessage(channelId, reprintMessage);
  }
});

bot.on("error", async (error, id) => {
  console.error(`error shard id: ${id} `, error);
  setTimeout(async () => {
    try {
      await bot.connect();
    } catch (e) {
      console.error(e);
    }
  }, 10 * 1000);
});

bot.connect();
