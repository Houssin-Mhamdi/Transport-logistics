"use client";

import { motion, Variants } from "framer-motion";
import TopNavBar from "@/components/ui/TopNavBar";
import Footer from "@/components/ui/Footer";

const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function About() {
    return (
        <main className="min-h-screen bg-surface-container-low">
            <TopNavBar activePage="about" />

            {/* <!-- Hero Section --> */}
            <section className="relative h-[600px] md:h-[819px] flex items-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img alt="Global Logistics Hub" className="w-full h-full object-cover " data-alt="expansive aerial view of a massive container terminal at night with bright golden lights reflecting on deep blue harbor waters" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiB8nttqsVT0sPwAGA84HbxOaXhmKdL57SwdLKeg1LJB0LQnqL-XKFJ34xuphiE71nFQxNr5VCOpIjMVzbt-N5orEqalBJVV6jb6w5aQXRdkQ0EOz_kkCcUv0cYTUc8sDFNa0pF8Xj5YgvkTkOQJhUD1tzW6LR87VtFH8mlXeTBelNJ7ezrRtTSc8k7sfn-mhMV3HeLtKTlx8OO_Bd9ur9yD-w8bHmIOyuCN4NUaL4QcUEy0G77Fn_6Zo4ceS9n7euWIQz7RTNu6HL" />
                    <div className="absolute inset-0 hero-gradient bg-slate-900/40 mix-blend-multiply"></div>
                </motion.div>
                <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-2xl"
                    >
                        <span className="text-secondary-container font-label text-sm font-bold tracking-[0.2em] mb-4 block">GLOBAL OPERATIONS</span>
                        <h1 className="text-white font-headline text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
                            Engineering <br />Global Trust.
                        </h1>
                        <p className="text-on-primary-container text-lg leading-relaxed max-w-lg">
                            From individual shipments to complex supply chain management, we architect the pathways that keep the modern world in motion.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* <!-- Our Story Section --> */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            className="md:col-span-5"
                        >
                            <span className="text-secondary font-label text-xs font-bold tracking-[0.2em] mb-4 block">ESTABLISHED 1984</span>
                            <h2 className="font-headline text-4xl font-semibold text-primary mb-8 leading-tight">Our Evolution into a Global Leader</h2>
                            <div className="space-y-6 text-on-surface-variant body-md leading-relaxed">
                                <p>
                                    Transpro Logistics began as a modest regional carrier with three trucks and a singular vision: to bring precision and reliability to local commerce. What started in a small warehouse has expanded into a multi-modal global network spanning six continents.
                                </p>
                                <p>
                                    Our journey is defined by relentless engineering. We didn't just grow; we strategically built infrastructure, integrated cutting-edge technology, and cultivated a team of specialists who understand that in logistics, every millimeter and second matters.
                                </p>
                                <p>
                                    Today, we serve as the backbone for Fortune 500 companies and emerging innovators alike, proving that global trust is earned through consistent, architectural excellence.
                                </p>
                            </div>
                        </motion.div>
                        <div className="md:col-span-7">
                            <motion.div
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={staggerContainer}
                                className="relative grid grid-cols-2 gap-4"
                            >
                                <motion.div variants={fadeInUp} className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-xl">
                                    <img alt="Logistics Detail" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" data-alt="industrial close up of a cargo crane hoisting a heavy steel shipping container against a clear blue sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbaYDSB7ABK8EmumilPJNvg3PYgSxFfGUb4i-Np4zvpcjjgmq7d-OagCKpFKYLY1XGp7wyb4h_v_wd-MrjzMcRPSWJ63T5e_DD72_ws2yaQetUx6knpHx0eX_M6wc4uL1FzXTovakeFAtCgLSgdyufOGmateOUnq_SjNRCOIxGoysF4nyQCs1Z-uClMCmVdpz5O8JNkCwoFHobguJbiXUxsUl6_l4jjNciDtJCvD9PS_0HV6AM_89mdEIZuSDG4QxrfqK45AhpkJGj" />
                                </motion.div>
                                <motion.div variants={fadeInUp} className="aspect-[4/5] bg-surface-container-low mt-12 overflow-hidden rounded-xl shadow-xl">
                                    <img alt="Transport Fleet" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" data-alt="synchronized row of white commercial transport trucks parked at a terminal in geometric formation under cool daylight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqET2_PKDKcJ7VQO8IKYUf1zR-4IpIPBcW3lKaJqYWdeGqV3FcrkX-kCkCWhSoPEiF0iBwda9uMyiDT5-toA75EXMdWwVOQmLCj0f4QUWtOsIZIOOifUXidipOEUWMNKJ7Apbcx14C2UGvbIKUJPdwKn1HN_Fjp-L3i0DGZWgjuvq7ynwvpGxaWR2MpSWAVN76UR6N6OAos13oSnHpw2RN6iPPj7acEkXB9E40c86hxosqx_Fq5Q4mNSvilf6FSujgg6VEzQ9YHOcL" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Core Values Section --> */}
            <section className="py-24 bg-surface-container-low">
                <div className="max-w-7xl mx-auto px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="font-headline text-4xl font-semibold text-primary mb-4">The Pillars of Our Operation</h2>
                        <p className="text-on-surface-variant max-w-xl mx-auto">Our guiding principles aren't just words; they are the architectural blueprints for every decision we make.</p>
                    </motion.div>
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* <!-- Precision --> */}
                        <motion.div variants={fadeInUp} className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border-b-4 border-primary hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">architecture</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-4">Precision</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                We operate with surgical accuracy. From tracking data to physical handling, our processes are engineered to minimize error and maximize efficiency.
                            </p>
                        </motion.div>
                        {/* <!-- Integrity --> */}
                        <motion.div variants={fadeInUp} className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border-b-4 border-secondary-container hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-lg bg-secondary-container/10 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-secondary text-3xl">verified</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-4">Integrity</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                Transparency is the foundation of global trade. We maintain absolute honesty with our partners, stakeholders, and clients at every transit point.
                            </p>
                        </motion.div>
                        {/* <!-- Innovation --> */}
                        <motion.div variants={fadeInUp} className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border-b-4 border-primary hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-4">Innovation</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                We don't just follow industry standards; we set them. By leveraging AI and sustainable logistics, we are architecting the future of global movement.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* <!-- Leadership Section --> */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
                    >
                        <div className="max-w-xl">
                            <span className="text-secondary font-label text-xs font-bold tracking-[0.2em] mb-4 block">THE ARCHITECTS</span>
                            <h2 className="font-headline text-4xl font-semibold text-primary">Global Leadership</h2>
                        </div>
                        <p className="text-on-surface-variant max-w-sm">Leading our 15,000+ global employees with a commitment to excellence and strategic foresight.</p>
                    </motion.div>
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {/* <!-- Leader 1 --> */}
                        <motion.div variants={fadeInUp} className="group cursor-pointer">
                            <div className="aspect-[3/4] rounded-xl bg-surface-container-high mb-6 overflow-hidden shadow-sm">
                                {/* <img alt="CEO" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" data-alt="professional portrait of a confident man in a dark tailored suit against a neutral architectural background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Ar4txeR45f0YpT9a6680AqKF3oMevbZ-Tkde-UOcQT7-eCXKVdMeY2WjA8-LrPwVLrNEOgg_q7GsWSo9i25V-pgZ0_wV67IizQqlLwWr3CfNJLpQtjtsSKiicAcDvrhcd2upsIGGnf6R6OOgZDEH_Y054ZsevwKJTgp3B-8qKZohJ6G5c1V3No1fy-NpNy5MsYYgUNbu49O0I1b1_hosIsoI-QES0lsc98BLu_b4F1bwExJPFFuuUDRSog9DQTTH6lJS9D_dXXwb" /> */}
                                <img alt="CEO" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" data-alt="professional portrait of a confident man in a dark tailored suit against a neutral architectural background" src="/images/ceo.jpg" />
                            </div>
                            <h4 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors">Marcus Vancroft</h4>
                            <p className="font-label text-xs text-secondary-container font-bold tracking-widest mt-1">CHIEF EXECUTIVE OFFICER</p>
                        </motion.div>
                        {/* <!-- Leader 2 --> */}
                        <motion.div variants={fadeInUp} className="group cursor-pointer">
                            <div className="aspect-[3/4] rounded-xl bg-surface-container-high mb-6 overflow-hidden shadow-sm">
                                <img alt="COO" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" data-alt="professional woman in formal attire looking forward with a serious and capable expression, office background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4bgdjgADjgUwiOeYDTHInSmYWa6xwwTAp6XTcDXDvGZWWilWZBKarqubNMvn2r5mEheIYSZQv5j9R3_zuSDHNLlti7ywMLT8eGasAd2m5waEnyaKMtcENyfiGjXPObIoxd7noGFT3YRdsIe7Kt_829TOGno5lwkVISqNbDFaRi9hmnVe6wHaDK55PoHhlx2OxzWriqFSvU5TDrkO9MNPqAAcgmR7Ggjnx3QzGXLJXK-BM1PUsgYUQRTMUlIIT7o8s3ZbacrWOLhuc" />
                            </div>
                            <h4 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors">Elena Rodriguez</h4>
                            <p className="font-label text-xs text-secondary-container font-bold tracking-widest mt-1">CHIEF OPERATIONS OFFICER</p>
                        </motion.div>
                        {/* <!-- Leader 3 --> */}
                        <motion.div variants={fadeInUp} className="group cursor-pointer">
                            <div className="aspect-[3/4] rounded-xl bg-surface-container-high mb-6 overflow-hidden shadow-sm">
                                <img alt="CTO" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" data-alt="middle-aged man with glasses in a professional studio setting, wearing a navy blazer and white shirt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMPlnLoQkH1s9g0YZrquy36XsUNL2JlbbfbhvIn1zEKlejbE4GBKG8DbfAP7F0-pHFeV9uUzVQRqYLT5vuoD-JykiR1qrcm39cs8zRtVV0hR2tppqGhxl_Xu2odyILH0zAc6mDXVqSiCR_AET9IGcU7QxG06XyxLQHXcjairM-sWgw90fyMdRMZPTlKKki7EhIr_GQIRUUUVBR6D06gF6hQ49GmkVnOW4M-0qYOjnDSo_eXV6ed2mOjevSOZLxfHrVYc79uESrBGnH" />
                            </div>
                            <h4 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors">David Chen</h4>
                            <p className="font-label text-xs text-secondary-container font-bold tracking-widest mt-1">CHIEF TECHNOLOGY OFFICER</p>
                        </motion.div>
                        {/* <!-- Leader 4 --> */}
                        <motion.div variants={fadeInUp} className="group cursor-pointer">
                            <div className="aspect-[3/4] rounded-xl bg-surface-container-high mb-6 overflow-hidden shadow-sm">
                                <img alt="CFO" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" data-alt="sophisticated woman in a grey suit, smiling confidently in a modern bright corporate lobby environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV0wB2eznwC-WMi250Pxj5EAvamm7kXhxwKHrgdGoMqRFyh5vrRaCcHxYxX89A6Bgd-5_RjHkm7rdN8ETJGw2GZgWDhLLYU8mSO20CFYYxBxVdQjrECIyrgBpcpa-7Mu5g1CfaC6jFa9kGpFA9tDGiI6CgWYINuDZjP9DamLCe-f0q-T0JL7Ki0ik-dkThrt70Su0TsT6d1BsnigUOjtoPmfrY5FhLuCMSe3e5tZYT0MfWRXFEy_S2Su4DMiwyNe42tXea_wr5uaz6" />
                            </div>
                            <h4 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors">Sarah Jenkins</h4>
                            <p className="font-label text-xs text-secondary-container font-bold tracking-widest mt-1">CHIEF FINANCIAL OFFICER</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* <!-- CTA Section --> */}
            <section className="py-20 bg-primary overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="flex flex-col md:flex-row items-center justify-between gap-12"
                    >
                        <motion.div variants={fadeInUp} className="text-white max-w-2xl">
                            <h2 className="font-headline text-4xl font-bold mb-6">Ready to Architect Your Supply Chain?</h2>
                            <p className="text-on-primary-container text-lg opacity-90">Join the thousands of global partners who trust Transpro for precision logistics and unmatched reliability.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <button className="bg-secondary-container rounded-full text-on-secondary-container px-8 py-4 font-bold tracking-tight hover:brightness-110 transition-all shadow-xl hover:shadow-secondary/20">Get a Quote</button>
                            <button className="border border-outline-variant rounded-full text-white px-8 py-4 font-bold tracking-tight hover:bg-white/10 transition-all">Our Global Fleet</button>
                        </motion.div>
                    </motion.div>
                </div>
                {/* <!-- Decorative asset --> */}
                <motion.div
                    initial={{ rotate: 90, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 0.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute right-0 bottom-0 pointer-events-none translate-x-1/4 translate-y-1/4 hidden md:block"
                >
                    <span className="material-symbols-outlined text-[400px]">public</span>
                </motion.div>
            </section>

            <Footer />
        </main>
    )
}