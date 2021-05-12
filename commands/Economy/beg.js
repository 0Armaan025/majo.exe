const Discord = require("discord.js");
let users = [
 "Litek",
 "DankShit",
 "Sans",
 "Zero",
 "MEE9",
];

module.exports = {
 name: "beg",
 aliases: [],
 description: "Beg money",
 category: "Economy",
 usage: "beg",
 run: async (client, message, args) => {
  try {
   let amount = Math.floor(Math.random() * 50) + 10;
   let beg = client.economy.beg(message.author.id, message.guild, amount, { canLose: true }).then(function(beg) {
   if (beg.onCooldown) {
    message.channel.send({embed: {
     color: 16734039,
     description: `❌ | Begon Thot! Come back after ${beg.time.seconds} seconds`
    }})
   }
   if (beg.lost) {
    message.channel.send({embed: {
     color: 16734039,
     description: `❌ | **${users[Math.floor(Math.random() * users.length)]}:** Begon Thot! Try again later.`
    }})
   } else {
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`❌ | **${users[Math.floor(Math.random() * users.length)]}** donated you **${beg.amount}** 💸.`)
    return message.channel.send(embed);
   }
   })
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
