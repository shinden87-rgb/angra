'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, ExternalLink, Calendar, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import newsData from '@/data/news-feed.json';

interface NewsEntry {
    id: string;
    title: string;
    source_url: string;
    date: string;
    source_domain: string;
    study_type?: string;
}

export default function ResearchNewsPage() {
    const [news, setNews] = useState<NewsEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setNews(newsData);
        setLoading(false);
    }, []);

    const getTypeColor = (type?: string) => {
        if (!type) return "text-gray-500 border-gray-500/20 bg-gray-500/10";
        const t = type.toLowerCase();
        if (t.includes('meta')) return "text-purple-300 border-purple-500/20 bg-purple-500/10";
        if (t.includes('review')) return "text-emerald-300 border-emerald-500/20 bg-emerald-500/10";
        if (t.includes('original') || t.includes('study')) return "text-blue-300 border-blue-500/20 bg-blue-500/10";
        return "text-gray-400 border-gray-500/20 bg-gray-500/10";
    };

    return (
        <div className="min-h-screen text-gray-100 p-4 md:p-12 relative overflow-hidden bg-[#0a0c10]">
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-blue-500/10 text-blue-300 text-xs font-black uppercase tracking-[0.3em] mb-6 border-blue-500/20">
                            <Newspaper className="w-3.5 h-3.5" />
                            Evidence-Based Hub
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent italic leading-[1.1]">
                            Research Archive
                        </h1>
                        <div className="relative inline-block">
                            <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
                                科学的エビデンスに基づき、あなたの成長を多角的にサポートします。
                            </p>
                            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 1 }} className="h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 mt-2" />
                        </div>
                    </motion.div>
                </header>

                <section className="space-y-8">
                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                        <h2 className="text-2xl font-black flex items-center gap-3 italic">
                            <Layout className="w-6 h-6 text-blue-400" />
                            学術リサーチ・アーカイブ
                        </h2>
                        <div className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest bg-blue-500/5 px-4 py-2 rounded-xl border border-blue-500/10 backdrop-blur-sm">
                            Verified Source Only
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => <div key={i} className="h-64 rounded-3xl glass animate-pulse" />)}
                        </div>
                    ) : (
                        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
                            {news.map((item) => (
                                <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className="group relative">
                                    <div className="glass-card rounded-[2.5rem] overflow-hidden h-full flex flex-col p-6 hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-blue-500/20">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-gray-400 border border-white/10">
                                                <Calendar className="w-3 h-3" />
                                                {item.date}
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.source_domain}</span>
                                                {item.study_type && (
                                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${getTypeColor(item.study_type)}`}>
                                                        {item.study_type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold mb-8 group-hover:text-blue-400 transition-colors leading-[1.4] text-gray-100 flex-grow">{item.title}</h3>
                                        <Link href={item.source_url} target="_blank" className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-blue-500/20 hover:border-blue-500/30 transition-all group/btn uppercase tracking-widest gap-2">
                                            <ExternalLink className="w-4 h-4" />
                                            Source Paper
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </section>
            </div>
            <footer className="mt-32 py-16 text-center border-t border-white/5">
                <p className="text-xs font-black text-gray-600 tracking-[0.4em] uppercase">© 2026 Buddy Research Labs / Powered by Science.</p>
            </footer>
        </div>
    );
}
