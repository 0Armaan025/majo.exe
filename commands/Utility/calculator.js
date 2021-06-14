const Discord = require("discord.js");

module.exports = {
 name: "calculator",
 aliases: ["math", "calc"],
 description: "Calculator",
 category: "Utility",
 usage: "calculator [--gui] [math task]",
 run: async (client, message, args) => {
  try {
   if (args.includes("--gui")) {
    const calc = require("../../utilities/calculator");
    await calc(message);
   } else {
    try {
     args.replace("--gui", "");
     if (args.length < 1) {
      return message.lineReply({
       embed: {
        color: 16734039,
        description: "❌ | You must provide a equation to be solved on the calculator! (eg. 9 + 10)",
       },
      });
     }
     const question = args.join(" ");
     const calc = new Discord.MessageEmbed()
      .setTitle("💡 Calculator")
      .setColor("RANDOM")
      .addField("Question: ", `${question}`)
      .addField("Answer: ", `${require("mathjs").evaluate(question)}`)
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     return message.lineReply(calc);
    } catch (err) {
     message.lineReply({
      embed: {
       color: 16734039,
       description: "Invalid math equation!",
      },
     });
    }
   }
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
