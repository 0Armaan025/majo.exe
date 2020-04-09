const Discord = module.require("discord.js");

module.exports.run = async (message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return serverQueue.textChannel.send(`${message.author} ▶ resumed the music!`).catch(console.error);
    }
    return message.reply("There is nothing playing.").catch(console.error);
  }

module.exports.help = {
    name: "resume",
    description: "Display a queue",
    usage: "resume",
    type: "Fun"  
}

