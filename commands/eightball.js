const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!args.length) return message.channel.send("thee needeth to asketh f'r a f'rtune").then(msg => msg.delete(2300)); 

  var fortunes = ["Yes.", "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definelty.", "You may rely on it.",
  "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", 
  "Better not tell you now...", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", 
  "My sources say no.", "Outlook not so good...", "Very doubtful.",];  
  
  await message.channel.send(fortunes[Math.floor(Math.random()*fortunes.length)]);
}

module.exports.help = {
    name: "eightball",
    description: "Tells you a fortune",
    usage: "eightball <message>",
    type: "Fun"  
}
