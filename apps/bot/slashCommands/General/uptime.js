import { EmbedBuilder, time, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, ButtonStyle } from "discord.js";
import { config } from "../../config/index.js";

export default {
 name: "uptime",
 description: "⌛ View Majo.exe bot uptime and past status",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dmPermission: true,
 usage: "/uptime",
 run: async (client, interaction, guildSettings) => {
  try {
   const embed = new EmbedBuilder()
    .setDescription(
     `
     **🚀 Date launched**: ${time(client.readyAt)}

     **⏱️ Started**: ${time(client.readyAt, "R")}
     `
    )
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.bot.defaultEmbedColor)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   if (config.dashboard.enabled && config.dashboard.link) {
    const contactButton = new ButtonBuilder().setLabel("Status page").setStyle(ButtonStyle.Link).setURL(`${config.dashboard.link}/status`);
    const action = new ActionRowBuilder().addComponents(contactButton);
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   } else {
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
