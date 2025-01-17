import { globalConfig } from "@majoexe/config";
import { isBotInServer } from "./isBotInServer.js";

/**
 * @param {string} id The id of the server.
 * @returns {Promise<object>} The server object.
 * @example getServer(id)
 * */
export async function getServer(id) {
 try {
  const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${id}`, {
   next: { revalidate: 10 },
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (!res.ok) return { error: "Invalid server ID" };
  const json = await res.json();
  json.bot = await isBotInServer(id);
  return json;
 } catch (e) {
  return { error: "Invalid server ID" };
 }
}
