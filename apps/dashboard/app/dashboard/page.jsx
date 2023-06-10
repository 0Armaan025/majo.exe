import { PlusSmallIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { canAddBotToServer } from "@majoexe/util/functions";
import { getServers } from "@majoexe/util/functions";
import { isBotInServer } from "@majoexe/util/functions";
import { PrimaryButton } from "components/buttons/server/Primary";
import { SecondaryButton } from "components/buttons/server/Secondary";
import { getSession } from "lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CodeCard } from "@/components/blocks/Block";
import { Refetch } from "@/components/blocks/client/Refetch";
import { Header1 } from "@/components/blocks/Headers";

export async function getAllServers(token) {
 const servers = (await getServers(token)) || [];
 const filteredServers = servers.length > 0 ? servers.filter((server) => canAddBotToServer(server.permissions)) : [];
 const promises = filteredServers.map(async (server) => {
  server.bot = await isBotInServer(server.id);
  return server;
 });

 return await Promise.all(promises);
}

export default async function Dashboard() {
 const session = await getSession();
 if (!session) redirect("/auth/login");
 const user = await prismaClient.account.findFirst({
  where: {
   providerAccountId: session.discordId,
  },
 });
 if (!user || !user.access_token) return redirect("/auth/login");
 const servers = await getAllServers(user.access_token);

 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <div className="flex flex-col justify-center gap-4">
    <Header1>
     <RectangleStackIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Dashboard
    </Header1>
    <h2 className="text-center text-xl text-white/50">
     You can only add the bot to servers you have the <CodeCard>Manage Server</CodeCard> permission in.
    </h2>
    <div className="flex flex-col gap-4">
     {servers && servers.length > 0 ? (
      servers.map((server) => (
       <div key={server.id} className="flex flex-row items-center justify-start gap-4">
        {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="w-16 h-16 rounded-full" /> : <div className="w-16 h-16 rounded-full bg-button-secondary" />}
        <h3 className="text-center  text-xl font-bold">{server.name}</h3>

        <>
         {server.bot ? (
          <PrimaryButton href={`/dashboard/${server.id}`} className="ml-auto">
           <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Manage
          </PrimaryButton>
         ) : (
          <SecondaryButton href={`/api/invite/${server.id}`} className="ml-auto cursor-copy">
           <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
          </SecondaryButton>
         )}
        </>
       </div>
      ))
     ) : (
      <div className="flex flex-col items-center justify-center gap-4">
       <h3 className="text-center text-xl font-bold">You don't have any servers!</h3>
       <div className="flex flex-row items-center justify-start gap-2">
        <PrimaryButton href={"/invite"}>
         <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
        </PrimaryButton>
        <Refetch />
       </div>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}
