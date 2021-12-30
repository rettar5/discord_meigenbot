import { Message } from "eris";

export const getMessageUrl: (message: Message) => string = (message) => {
  return `https://discord.com/channels/${message.guildID}/${message.channel.id}/${message.id}`;
};

export const isFirstEmoji: (message: Message, emojiName: string) => boolean = (
  message,
  emojiName
) => {
  const reactionKey =
    Object.keys(message.reactions).find((key) => !!key.match(emojiName)) || "";
  const reaction = message.reactions[reactionKey] || null;
  return reaction?.count === 1;
};
