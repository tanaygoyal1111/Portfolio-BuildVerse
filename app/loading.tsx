export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative">
        <h1 className="font-bebas text-6xl md:text-9xl text-white tracking-widest opacity-80 animate-pulse">
          BUILDVERSE
        </h1>
        <div className="absolute inset-0 bg-red-600 opacity-20 blur-[80px] -z-10 rounded-full scale-150" />
      </div>
    </div>
  );
}
