import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-red/20 via-black to-black blur-2xl z-0" />
      <h2 className="font-bebas text-6xl md:text-9xl text-neon-red z-10">404</h2>
      <p className="text-xl md:text-2xl text-gray-400 z-10 mt-4 mb-8">Lost in the BuildVerse</p>
      <Link href="/" className="z-10 px-8 py-3 border border-white/20 hover:border-neon-red hover:text-neon-red transition-all duration-300 font-bebas tracking-widest text-xl">
        RETURN HOME
      </Link>
    </div>
  );
}
