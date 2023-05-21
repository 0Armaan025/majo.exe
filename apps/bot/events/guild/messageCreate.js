import { fetchProfanity } from "@majoexe/util/settings/index.js";
import prismaClient from "@majoexe/database/index.js";
import Filter from "bad-words";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const filter = new Filter();

export async function messageCreate(client, message) {
 if (!message.content) return;
 const content = message.content.slice(0, 250);
 const profanity = await fetchProfanity(message.guild.id);
 if (!profanity || profanity === 0) return;
 const isProfane = filter.isProfane(content);
 
 if ((profanity === 1 || profanity === 2) && !isProfane) return;

 if(isProfane && profanity === 1) {
  return takeAction(client, message);
 }
}

const takeAction = async (client, message) => {
 await message.delete();

 const query = await prismaClient.guildLogs.create({
  data: {
   Guild: {
    connectOrCreate: {
     where: {
      guildId: message.guild.id,
     },
     create: {
      guildId: message.guild.id,
     },
   },
  },
   authorId: message.author.id,
   content: `Detected and deleted a message from <@${message.author.id}> for using a bad word.`,
   type: "profanity",
  },
 });
 

 const embed = new EmbedBuilder()
  .setTitle("‼️ Bad word detected")
  .setDescription(`
  <@${message.author.id}> message has been deleted for using a bad word.

  **Message ID**: \`${message.id}\`
  **User ID**: \`${message.author.id}\`
  **Infraction ID**: \`${query.id}\`
  `)
  .setColor("#EF4444")
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL({
   dynamic: true,
   format: "png",
   size: 2048,
  }))
  .setFooter({
   iconURL: client.user?.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   }),
   text: "The filter was applied because message scanning was enabled on the server!",
  });

  if(client.config.dashboard.enabled && client.config.dashboard.link) {
   const row = new ActionRowBuilder()
    .addComponents(
     new ButtonBuilder()
      .setLabel("View server logs")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.dashboard.link}/dashboard/${message.guild.id}/logs`)
    );
    return await message.channel.send({ embeds: [embed], components: [row] });
   }

 await message.channel.send({ embeds: [embed] });
};
