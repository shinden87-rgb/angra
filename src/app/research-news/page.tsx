'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, ExternalLink, Calendar, Newspaper, ArrowRight, ArrowLeft, Archive, ChevronDown } from 'lucide-react';
import Link from 'next/link';

import newsData from '@/data/news-feed.json';

// ▼ 表示件数の設定（ここでは6件＝2行分に設定）
const INITIAL_DISPLAY_COUNT = 6;

interface NewsEntry {
    id: string;
    title: string;
    source_url: string;
    date: string;
    source_domain: string;
    study_type?: string;
    category?: string;
}

export default function ResearchNewsPage() {
    const [news, setNews] = useState<NewsEntry[]>([]);
    const [filteredNews, setFilteredNews] = useState<NewsEntry[]>([]);
    const [visibleNews, setVisibleNews] = useState<NewsEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const sortedData = [...newsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNews(sortedData);

        const cats = ['All', ...Array.from(new Set(sortedData.map(item => item.category || 'Other')))];
        setCategories(cats);

        setLoading(false);
    }, []);

    useEffect(() => {
        let result = [];
        if (selectedCategory === 'All') {
            result = news;
        } else {
            result = news.filter(item => (item.category || 'Other') === selectedCategory);
        }
        setFilteredNews(result);

        if (isExpanded) {
            setVisibleNews(result);
        } else {
            setVisibleNews(result.slice(0, INITIAL_DISPLAY_COUNT));
        }
    }, [selectedCategory, news, isExpanded]);

    const handleExpand = () => {
        setIsExpanded(true);
    };

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
                {/* Back Link */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
                    {/* 必要であればここに正しいトップページのURLを入れてください */}
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold tracking-wide">Back to Buddy</span>
                    </Link>
                </motion.div>

                <header className="mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-blue-500/10 text-blue-300 text-xs font-black uppercase tracking-[0.3em] mb-6 border-blue-500/20">
                            <Newspaper className="w-3.5 h-3.5" />
                            Evidence-Based Hub
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent italic leading-[1.1]">
                            Buddy Research Archive
                        </h1>
                        <div className="relative inline-block w-full">
                            <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide max-w-2xl">
                                科学的エビデンスに基づき、あなたの成長を多角的にサポートします。
                            </p>
                            <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 mt-8" />
                        </div>
                    </motion.div>
                </header>

                <section className="space-y-8 pb-24">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
                        <div>
                            <h2 className="text-2xl font-black flex items-center gap-3 italic mb-2">
                                <Layout className="w-6 h-6 text-blue-400" />
                                学術リサーチ・アーカイブ
                            </h2>
                            <p className="text-sm text-gray-500 font-medium ml-9">
                                Verified Source Only
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${selectedCategory === cat
                                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => <div key={i} className="h-64 rounded-3xl glass animate-pulse" />)}
                        </div>
                    ) : (
                        <>
                            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode='popLayout'>
                                    {visibleNews.map((item) => (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            className="group relative h-full"
                                        >
                                            <div className="glass-card rounded-[2.5rem] overflow-hidden h-full flex flex-col p-6 hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-gray-400 border border-white/10 self-start">
                                                            <Calendar className="w-3 h-3" />
                                                            {item.date}
                                                        </div>
                                                        {item.category && (
                                                            <div className="text-[10px] font-black tracking-widest uppercase text-blue-400/80 px-2">
                                                                {item.category}
                                                            </div>
                                                        )}
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
                                </AnimatePresence>
                            </motion.div>

                            {!isExpanded && filteredNews.length > INITIAL_DISPLAY_COUNT && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-12 flex justify-center"
                                >
                                    <button
                                        onClick={handleExpand}
                                        className="group relative w-full md:w-auto overflow-hidden rounded-full bg-white/5 border border-white/10 px-12 py-4 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        <div className="flex items-center gap-3 text-sm font-black tracking-[0.2em] text-gray-300 group-hover:text-white uppercase">
                                            <Archive className="w-4 h-4 text-blue-400" />
                                            View Past Archives
                                            <span className="text-xs text-gray-500 ml-2">({filteredNews.length - INITIAL_DISPLAY_COUNT} More)</span>
                                            <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                                        </div>
                                    </button>
                                </motion.div>
                            )}
                        </>
                    )}
                </section>
            </div>
            <footer className="mt-12 py-16 text-center border-t border-white/5">
                <p className="text-xs font-black text-gray-600 tracking-[0.4em] uppercase">© 2026 Buddy Research Labs / Powered by Science.</p>
            </footer>
        </div>
    );
}