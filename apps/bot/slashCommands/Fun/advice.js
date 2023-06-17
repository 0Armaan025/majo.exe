import { ImportJSON } from "@majoexe/util/json";
import { ApplicationCommandType, EmbedBuilder } from "discord.js";

const advices = await ImportJSON("advices");

export default {
 name: "advice",
 description: "🤌 Get a random helpful advice",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/advice",
 run: async (client, interaction, guildSettings) => {
  try {
   const parsed = advices[Math.floor(Math.random() * advices.length)];

   const embed = new EmbedBuilder()
    .setTitle("🤌 My advice is:")
    .setDescription(`>>> **${parsed.advice}**`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.bot.defaultEmbedColor)
    .setThumbnail(
     interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     })
    )
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
