/**
 * Checks if the bot is in a server
 * @param {string} guildId The guild ID.
 * @returns {boolean} If the bot is in the server.
 * */
export async function isBotInServer(guildId) {
 const res = await fetch(`https://discord.com/api/guilds/${guildId}/members/${process.env.CLIENT_ID}`, {
  next: { revalidate: 10 },
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
  },

 }
 );
 if (res.ok) return true;
 return false;
}
