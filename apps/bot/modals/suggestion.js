const timeout = new Map();
import { EmbedBuilder } from "discord.js";
import { formatDuration } from "@majoexe/util/functions";
import prismaClient from "@majoexe/database";

export default {
 id: "suggestion",
 run: async (client, interaction, guildSettings) => {
  await interaction.deferReply({ ephemeral: true });
  const suggestion = interaction.fields.getTextInputValue("suggestion");
  if (suggestion.length < 5 || suggestion.length > 500) {
   const embed = new EmbedBuilder()
    .setTitle("‼️ Your suggestion must be between 5 and 500 characters!")
    .setDescription("Please make sure your suggestion is between 5 and 500 characters!")
    .setColor("#EF4444")
    .setTimestamp()
    .setFooter({
     text: `Suggested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  const key = `${interaction.member?.user?.id}-suggest`;

  if (timeout.has(key) && timeout.get(key).time > Date.now()) {
   const time = timeout.get(key).time;
   const duration = formatDuration(time - Date.now());

   const embed = new EmbedBuilder()
    .setTitle("‼️ You are on cooldown!")
    .setDescription(`You are on cooldown for \`${duration}\`! Please wait before suggesting again!`)
    .setColor("#EF4444")
    .setTimestamp()
    .setFooter({
     text: `Suggested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  timeout.set(key, { time: Date.now() + 60000 });
  setTimeout(() => {
   timeout.delete(key);
  }, 60000);

  const embed = new EmbedBuilder()
   .setTitle("📝 Thank you for your suggestion!")
   .setDescription(`**Suggestion**: ${suggestion}`)
   .setColor("#3B82F6")
   .setTimestamp()
   .setFooter({
    text: `Suggested by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });

  await prismaClient.suggestions.create({
   data: {
    message: suggestion,
    userId: interaction.member?.user?.id,
    guildId: interaction.guild?.id,
   },
  });

  return interaction.followUp({ ephemeral: true, embeds: [embed] });
 },
};