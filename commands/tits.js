const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                title: "You can use this command in an NSFW Channel!"
            }})
	}
    superagent.get('https://nekos.life/api/v2/img/tits')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle(":smirk: Tits")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Tags: tits`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
	
	
}

module.exports.help = {
    name: "cum",
    description: "Display a random tits image/gif (PS: Small tits is the best :smirk:)",
    usage: "cum",
    type: "NSFW" 
}