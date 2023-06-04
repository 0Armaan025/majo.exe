import { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export default {
 name: "suggestion",
 description: "📝 Send a suggestion to the Majo.exe team",
 type: ApplicationCommandType.ChatInput,
 cooldown: 10000,
 dmPermission: false,
 defer: false,
 usage: "/suggestion",
 run: async (client, interaction) => {
  try {
   const modal = new ModalBuilder().setCustomId("suggestion").setTitle("📝 Suggestion");
   const suggestion = new TextInputBuilder().setCustomId("suggestion").setPlaceholder("Enter your suggestion here...").setMinLength(5).setMaxLength(500).setRequired(true).setStyle(TextInputStyle.Paragraph).setLabel("Suggestion");
   const action = new ActionRowBuilder().addComponents(suggestion);
   modal.addComponents(action);
   await interaction.showModal(modal);
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
