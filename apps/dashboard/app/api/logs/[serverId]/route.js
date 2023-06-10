import { fetchLogs } from "@majoexe/util/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 try {
  const serverId = params.serverId;
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const start = Date.now();

  if (!serverId) {
   return new NextResponse(
    JSON.stringify({
     error: "Bad Request",
    }),
    {
     status: 400,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const session = await getSession();
  if (!session) {
   return new NextResponse(
    JSON.stringify({
     error: "Unauthorized",
    }),
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const server = await getServer(serverId);

  if (!server || server.error) {
   return new NextResponse(
    JSON.stringify({
     error: "Server not found",
     code: 404,
    }),
    {
     status: 404,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (!server.bot) {
   return new NextResponse(
    JSON.stringify({
     error: "Bot is not in server",
     code: 404,
    }),
    {
     status: 404,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const logs = await fetchLogs(serverId, page);

  logs.forEach((log) => {
   log.createdAt = log.createdAt.toISOString();
  });

  /* eslint-disable func-names, space-before-function-paren */
  BigInt.prototype.toJSON = function () {
   return this.toString();
  };
  /* eslint-enable func-names, space-before-function-paren */

  return new NextResponse(
   JSON.stringify(logs),
   {
    status: 200,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 } catch (err) {
  console.log(err);
  return new NextResponse(
   JSON.stringify({
    error: "Internal Server Error",
   }),
   {
    status: 500,
   }
  );
 }
}
