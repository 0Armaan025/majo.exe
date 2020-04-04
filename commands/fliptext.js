const Discord = module.require("discord.js");
const flip = require("flip-text");

module.exports.run = async (client, message, args) => {


      var flipped = [];
  
  args.forEach((arg) => {
      flipped.push(flip(arg));
  });
    
    await message.channel.send({embed: {
        color: 3447003,
        title: "Flipped text: " + flipped.join(" "),
    }});
}

module.exports.help = {
    name: "fliptext",
    description: "Flip some text",
    usage: "fliptext <text>",
    type: "Fun"
}