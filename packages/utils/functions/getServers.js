/**
 * @param {string} token The token of the user.
 * @returns {Promise<any>} The servers the user is in.
 * @example getServers("token")
 * @example getServers("token").then((res) => console.log(res))
 * */
export async function getServers(token) {
 const res = await fetch("https://discord.com/api/users/@me/guilds", {
  next: { revalidate: 10 },
  headers: {
   Authorization: `Bearer ${token}`,
  },
 });
 if (res.ok) return await res.json();
 return { error: "Invalid token" };
}
