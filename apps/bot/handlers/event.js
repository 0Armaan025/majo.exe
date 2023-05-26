import { Logger } from "@majoexe/util/functions";
import { config } from "../config/index.js";
import { readdirSync } from "node:fs";

export default async function loadEvents(client) {
 const loadTime = performance.now();

 const read = async (dirs) => {
  const events = readdirSync(`${process.cwd()}/events/${dirs}/`).filter((d) => d.endsWith("js"));
  for (const file of events) {
   await import(`${process.cwd()}/events/${dirs}/${file}`).then((e) => {
    const eventName = file.split(".")[0];
    config.debugger.displayEventList && Logger("info", `Loaded event ${eventName} from /events/${dirs}/${file}`);
    client.on(eventName, e[eventName].bind(null, client));
   });
  }
  Logger("event", `Loaded ${events.length} events from /events/${dirs} in ${client.performance(loadTime)}`);
 };

 ["client", "guild"].forEach((x) => read(x));
}
