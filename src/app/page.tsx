import Link from 'next/link';
import { Newspaper, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0c10] text-white p-4 relative overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-2xl space-y-8">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-gray-400 to-gray-600 bg-clip-text text-transparent italic">
          BUDDY
        </h1>
        <p className="text-xl text-gray-400 font-medium">
          Personal Growth Platform
        </p>

        <Link
          href="/research-news"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-200 transition-all duration-300 backdrop-blur-sm"
        >
          <Newspaper className="w-5 h-5" />
          <span className="font-bold tracking-widest uppercase text-sm">Open Research Archive</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}