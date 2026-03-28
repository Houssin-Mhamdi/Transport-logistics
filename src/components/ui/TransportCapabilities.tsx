"use client";

import { motion } from "framer-motion";

const capabilities = [
    {
        icon: "https://navidex.de/wp-content/uploads/2025/05/Group-78921.svg?x23118",
        title: "Letters & Parcels to Pallets",
        description: "From individual documents to industrial pallet shipments—every item treated with premium care.",
        highlight: "Versatile Fleet",
        color: "from-blue-600 to-indigo-600",
        shadow: "shadow-blue-500/10",
        iconBg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        icon: "https://navidex.de/wp-content/uploads/2025/05/noun-ruler-2023045.svg?x23118",
        title: "Extended Dimensions",
        description: (
            <div className="space-y-1">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-1">
                    <span className="text-slate-500">Max Length</span>
                    <span className="font-bold text-primary">480 cm</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-1">
                    <span className="text-slate-500">Max Width</span>
                    <span className="font-bold text-primary">230 cm</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Max Height</span>
                    <span className="font-bold text-primary">240 cm</span>
                </div>
            </div>
        ),
        highlight: "Space Optimization",
        color: "from-emerald-600 to-teal-600",
        shadow: "shadow-emerald-500/10",
        iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
        icon: "https://navidex.de/wp-content/uploads/2025/05/Group-78923.svg?x23118",
        title: "Payload Powerhouse",
        description: (
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <div className="flex-1 text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Min</div>
                    <div className="text-lg font-black text-primary font-mono">1 KG</div>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Max</div>
                    <div className="text-lg font-black text-primary font-mono">1,200 KG</div>
                </div>
            </div>
        ),
        highlight: "Heavy Duty",
        color: "from-purple-600 to-violet-600",
        shadow: "shadow-purple-500/10",
        iconBg: "bg-purple-50 dark:bg-purple-900/20",
    },
];

export default function TransportCapabilities() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-100 to-transparent blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-purple-100 to-transparent blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Reliable Transport Solutions
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.9] mb-6"
                        >
                            We'll transport <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">that for you.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-sm lg:text-right"
                    >
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                            No matter the size, weight, or urgency, our high-performance fleet ensures your freight arrives on time, every time.
                        </p>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {capabilities.map((capability, index) => (
                        <motion.div
                            key={capability.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative bg-white dark:bg-slate-900/50 rounded-3xl p-10 transition-all duration-500 border border-slate-100 dark:border-slate-800 ${capability.shadow} hover:shadow-2xl hover:-translate-y-2`}
                        >
                            {/* Card Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 rounded-3xl -z-10" />

                            {/* Icon & Badge Row */}
                            <div className="flex items-center justify-between mb-8">
                                <div className={`w-14 h-14 ${capability.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <img src={capability.icon} alt="" className="w-8 h-8 object-contain" />
                                </div>
                                <span className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                    {capability.highlight}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors">
                                {capability.title}
                            </h3>

                            {/* Description Rendering */}
                            <div className="text-slate-600 dark:text-slate-400 leading-relaxed min-h-[80px]">
                                {capability.description}
                            </div>

                            {/* Interactive Arrow */}
                            <div className="mt-10 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                Learn More
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Stats/CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center p-12 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full" />
                    <div className="relative z-10 text-center">
                        <h4 className="text-2xl font-bold mb-4">Request a custom transport dimension?</h4>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto">Our logistics network covers everything from standard courier services to heavy machinery transport.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-primary hover:bg-white hover:text-primary text-white rounded-full font-bold transition-all duration-300">
                                Contact Experts
                            </button>
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all duration-300 border border-white/10">
                                Download Specs
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}