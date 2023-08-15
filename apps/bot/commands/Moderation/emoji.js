/* eslint-disable complexity */
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } from "discord.js";
import isURL from "validator/lib/isURL.js";

export default {
 name: "emoji",
 description: "🎨 Manage emojis on this server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/emoji create <emoji name> <emoji url> | /emoji delete <emoji> | /emoji info <emoji> | /emoji steal <new emoji name> <emoji> | /emoji list",
 options: [
  {
   name: "create",
   description: "🎨 Create an emoji on this server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji create <emoji name> <emoji url>",
   options: [
    {
     name: "emoji_name",
     description: "The name of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
    {
     name: "emoji_url",
     description: "The URL of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "delete",
   description: "🎨 Delete an emoji from this server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji delete <emoji>",
   options: [
    {
     name: "emoji",
     description: "The name or id of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "info",
   description: "🎨 Get info about an emoji",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji info <emoji>",
   options: [
    {
     name: "emoji",
     description: "The name or id of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "steal",
   description: "🎨 Steal an emoji from another server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji steal <emoji name> <emoji>",
   options: [
    {
     name: "new_name",
     description: "The name of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
    {
     name: "emoji",
     description: "The emoji to steal",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "list",
   description: "🎨 List all emojis on this server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji list",
  },
 ],
 run: async (client, interaction, guildSettings) => {
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === "create") {
   try {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) {
     return client.errorMessages.createSlashError(interaction, "❌ You need the `MANAGE_EMOJIS_AND_STICKERS` permission to create emojis!");
    }
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) {
     return client.errorMessages.createSlashError(interaction, "❌ I need `BAN_MEMBERS` permission to ban members");
    }

    const emojiName = interaction.options.getString("emoji_name");
    const emojiURL = interaction.options.getString("emoji_url");

    if (emojiName.length > 32) {
     return client.errorMessages.createSlashError(interaction, "❌ Emoji name must be less than 32 characters!");
    }

    if (emojiName.length < 2) {
     return client.errorMessages.createSlashError(interaction, "❌ Emoji name must be more than 2 characters!");
    }

    if (!isURL(emojiURL)) {
     return client.errorMessages.createSlashError(interaction, "❌ Invalid emoji URL!");
    }

    try {
     const emoji = await interaction.guild.emojis.create({
      attachment: emojiURL,
      name: emojiName,
     });

     const embed = new EmbedBuilder()
      .setColor(guildSettings?.embedColor || client.config.defaultColor)
      .setTimestamp()
      .setTitle(`${client.config.emojis.success} Emoji successfully created!`)
      .setFields([
       {
        name: `${client.config.emojis.edit} Emoji name`,
        value: `\`\`\`${emoji.name}\`\`\``,
        inline: true,
       },
       {
        name: `${client.config.emojis.screw_that} Emoji ID`,
        value: `\`\`\`${emoji.id}\`\`\``,
        inline: true,
       },
       {
        name: `${client.config.emojis.link} Emoji URL`,
        value: `> <${emoji.url}>`,
       },
      ])
      .setThumbnail(emoji.url)
      .setFooter({
       text: `Requested by ${interaction.user.username}`,
       iconURL: interaction.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      });

     return interaction.followUp({ ephemeral: false, embeds: [embed] });
    } catch (err) {
     return client.errorMessages.createSlashError(interaction, "❌ Cannot create emoji! It may be because of the following reasons:\n\n>>> - You have reached the maximum number of emojis on this server\n- The emoji URL is invalid\n- The emoji name is invalid\n- The emoji is too large");
    }
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
  } else if (subcommand === "delete") {
   try {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) {
     return client.errorMessages.createSlashError(interaction, "❌ You need the `MANAGE_EMOJIS_AND_STICKERS` permission to create emojis!");
    }
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) {
     return client.errorMessages.createSlashError(interaction, "❌ I need `BAN_MEMBERS` permission to ban members");
    }

    const emoji = interaction.options.getString("emoji");
    let emojiToDelete;

    if (!isNaN(emoji)) {
     emojiToDelete = await interaction.guild.emojis.fetch(emoji);
    } else {
     emojiToDelete = interaction.guild.emojis.cache.find((semoji) => semoji.name === emoji || semoji.name.toLowerCase() === emoji.toLowerCase() || semoji.name === emoji.split(":")[0] || semoji.name === emoji.split(":")[1]);
    }

    if (!emojiToDelete) {
     return client.errorMessages.createSlashError(interaction, "❌ It seems like that emoji doesn't exist!");
    }

    if (emojiToDelete.managed) {
     return client.errorMessages.createSlashError(interaction, "❌ You cannot delete an emoji that is managed by an external service!");
    }

    try {
     await emojiToDelete.delete();
    } catch (err) {
     return client.errorMessages.createSlashError(interaction, "❌ Cannot delete emoji! It may be because of the following reasons:\n\n>>> - The emoji is not from this server\n- The emoji is not found\n - This is just a bug");
    }

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle(`${client.config.emojis.success} Emoji successfully deleted!`)
     .setFields([
      {
       name: `${client.config.emojis.edit} Emoji name`,
       value: `\`\`\`${emojiToDelete.name}\`\`\``,
       inline: true,
      },
      {
       name: `${client.config.emojis.screw_that} Emoji ID`,
       value: `\`\`\`${emojiToDelete.id}\`\`\``,
       inline: true,
      },
      {
       name: `${client.config.emojis.link} Emoji URL`,
       value: `> <${emojiToDelete.url}>`,
      },
     ])
     .setThumbnail(emojiToDelete.url)
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
  } else if (subcommand === "info") {
   try {
    const emoji = interaction.options.getString("emoji");
    let emojiToGet;

    if (!isNaN(emoji)) {
     emojiToGet = await interaction.guild.emojis.fetch(emoji);
    } else {
     emojiToGet = interaction.guild.emojis.cache.find((semoji) => semoji.name === emoji || semoji.name.toLowerCase() === emoji.toLowerCase() || semoji.name === emoji.split(":")[0] || semoji.name === emoji.split(":")[1]);
    }

    if (!emojiToGet) {
     return client.errorMessages.createSlashError(interaction, "❌ It seems like that emoji doesn't exist!");
    }

    const addedBy = await emojiToGet.fetchAuthor();

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle(`${emoji} Emoji info`)
     .setFields([
      {
       name: `${client.config.emojis.edit} Emoji name`,
       value: `\`\`\`${emojiToGet.name}\`\`\``,
       inline: true,
      },
      {
       name: `${client.config.emojis.screw_that} Emoji ID`,
       value: `\`\`\`${emojiToGet.id}\`\`\``,
       inline: true,
      },
      {
       name: `${client.config.emojis.question} Animated`,
       value: `\`\`\`${emojiToGet.animated ? "Yes" : "No"}\`\`\``,
       inline: true,
      },
      {
       name: `${client.config.emojis.member} Added by`,
       value: `> ${addedBy}`,
       inline: true,
      },
      {
       name: `${client.config.emojis.stopwatch} Added at`,
       value: `> <t:${Math.floor(emojiToGet.createdTimestamp / 1000)}:R>`,
       inline: true,
      },
      {
       name: `${client.config.emojis.link} Emoji URL`,
       value: `> <${emojiToGet.url}>`,
      },
     ])
     .setThumbnail(emojiToGet.url)
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
  } else if (subcommand === "steal") {
   return client.errorMessages.createSlashError(interaction, "❌ This command is not available yet!");
  } else if (subcommand === "list") {
   try {
    const embed = new EmbedBuilder()
     .setColor("#5865F2")
     .setTitle(`${client.config.emojis.success} Emojis on this server`)
     .setFields([
      {
       name: "Total Emojis",
       value: `\`\`\`${interaction.guild.emojis.cache.size}\`\`\``,
       inline: true,
      },
      {
       name: "Animated Emojis",
       value: `\`\`\`${interaction.guild.emojis.cache.filter((emoji) => emoji.animated).size}\`\`\``,
       inline: true,
      },
      {
       name: "Static Emojis",
       value: `\`\`\`${interaction.guild.emojis.cache.filter((emoji) => !emoji.animated).size}\`\`\``,
       inline: true,
      },
     ])
     .setDescription(
      `> ${
       interaction.guild.emojis.cache.map((emoji) => emoji).join(" ").length > 2048
        ? interaction.guild.emojis.cache
           .map((emoji) => emoji)
           .join(" ")
           .slice(0, 2048) + "..."
        : interaction.guild.emojis.cache.map((emoji) => emoji).join(" ")
      }`
     )
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
  }
 },
};
