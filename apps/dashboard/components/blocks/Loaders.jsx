export function Dots() {
 return (
  <div className="mx-4 flex flex-row items-center gap-2">
   {[...Array(3)].map((_, i) => (
    <div key={i} className="h-2 w-2 animate-[loader_1s_ease-in-out_infinite] rounded-full bg-gray-400" style={{ animationDelay: `${150 * i - 50}ms` }} />
   ))}
  </div>
 );
}
