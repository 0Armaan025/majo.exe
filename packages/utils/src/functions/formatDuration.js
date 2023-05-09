export function formatDuration(durationInMs) {
 const ms = durationInMs % 1000;
 const totalSeconds = Math.floor(durationInMs / 1000);
 const seconds = totalSeconds % 60;
 const totalMinutes = Math.floor(totalSeconds / 60);
 const minutes = totalMinutes % 60;
 const totalHours = Math.floor(totalMinutes / 60);
 const hours = totalHours % 24;

 const parts = [];

 if (hours > 0) {
  parts.push(`${hours}h`);
 }
 if (minutes > 0) {
  parts.push(`${minutes}m`);
 }
 if (seconds > 0) {
  parts.push(`${seconds}s`);
 }
 if (ms > 0) {
  parts.push(`${ms}ms`);
 }

 return parts.join(" ");
}
