import React from 'react'
import TopNavBar from '@/components/ui/TopNavBar'
import Footer from '@/components/ui/Footer'

function page() {
    return (
        <>
            <TopNavBar activePage="contact" />
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative min-h-[450px] flex items-center overflow-hidden bg-primary">
                    <div className="absolute inset-0 z-0">
                        <img className="w-full h-full object-cover opacity-30 mix-blend-luminosity" data-alt="cinematic wide shot of a modern logistics distribution center with sunset lighting and blurred motion of cargo movement" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgEtULcAEudslmo5fIYA37zR2W4nCsz4fX6Ur530EHZyQHrweOGTzfiNQCmfWBqJqBsY1xA4m2ZAo54mTGgFytrUXaLND0pToV7oX3Rk1PaN-5plf4x-ilyVlMzMzhmE6PTlUEdOD3hU5-gY1qgjsRqlsjI-QDUmfvGFcO306CG7ZBPARt3VKdpMsA4ggI9n5nC6Jt-IwXbIVGEanRGJ0FFjkJATsq3cFM4zishxHTR_yQ1aCuLr3UzUZUNl1f20hvUSkDHaAEavaZ" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-12 w-full">
                        <div className="max-w-3xl">
                            <h1 className="font-headline text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                                Connect with Our <br /><span className="text-secondary-container">Logistics Architects</span>
                            </h1>
                            <p className="font-body text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
                                Global reach with a personal touch. Reach out to our specialized teams for a consultation on your most complex supply chain challenges.
                            </p>
                        </div>
                    </div>
                </section>
                {/* <!-- Main Content Area --> */}
                <section className="py-24 px-8 md:px-12 max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* <!-- Left Column: Contact Form --> */}
                        <div className="lg:col-span-7">
                            <div className="bg-surface-container-lowest p-10 md:p-12 shadow-[0px_24px_48px_rgba(25,28,29,0.04)] rounded-lg">
                                <h2 className="font-headline text-3xl font-semibold text-primary mb-8">Send a Manifest</h2>
                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="font-label text-xs uppercase tracking-widest font-bold text-outline">Full Name</label>
                                            <input className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-secondary py-3 px-4 transition-colors outline-none font-body text-on-surface" placeholder="John Doe" type="text" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-label text-xs uppercase tracking-widest font-bold text-outline">Corporate Email</label>
                                            <input className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-secondary py-3 px-4 transition-colors outline-none font-body text-on-surface" placeholder="john.doe@company.com" type="email" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-label text-xs uppercase tracking-widest font-bold text-outline">Subject</label>
                                        <select className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-secondary py-3 px-4 transition-colors outline-none font-body text-on-surface appearance-none">
                                            <option>Strategic Partnership</option>
                                            <option>Fleet Inquiry</option>
                                            <option>Supply Chain Audit</option>
                                            <option>Global Network Inquiry</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-label text-xs uppercase tracking-widest font-bold text-outline">Message</label>
                                        <textarea className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-secondary py-3 px-4 transition-colors outline-none font-body text-on-surface resize-none" placeholder="Describe your logistical requirements..." rows={5}></textarea>
                                    </div>
                                    <button className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container text-white px-12 py-4 rounded font-headline font-bold tracking-tight hover:shadow-lg transition-all" type="submit">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                        {/* <!-- Right Column: Headquarters & Regional --> */}
                        <div className="lg:col-span-5 space-y-12">
                            {/* <!-- Headquarters Card --> */}
                            <div className="bg-surface-container-low p-8 rounded-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                    <h3 className="font-headline text-xl font-bold text-primary">Global Headquarters</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-label text-xs uppercase tracking-[0.05em] font-bold text-outline mb-1">Address</p>
                                        <p className="font-body text-on-surface">1200 Maritime Way, Suite 400<br />Houston, TX 77002, USA</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-label text-xs uppercase tracking-[0.05em] font-bold text-outline mb-1">Phone</p>
                                            <p className="font-body text-on-surface">+1 (800) 555-TRANS</p>
                                        </div>
                                        <div>
                                            <p className="font-label text-xs uppercase tracking-[0.05em] font-bold text-outline mb-1">Email</p>
                                            <p className="font-body text-on-surface">hq@transpro.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Regional Offices --> */}
                            <div>
                                <h3 className="font-headline text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-secondary text-sm">public</span>
                                    Regional Hubs
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded border-l-4 border-primary shadow-sm">
                                        <div>
                                            <h4 className="font-headline font-bold text-primary">London</h4>
                                            <p className="text-xs font-body text-outline">EMEA Operations Center</p>
                                        </div>
                                        <span className="material-symbols-outlined text-outline-variant">arrow_forward_ios</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded border-l-4 border-secondary shadow-sm">
                                        <div>
                                            <h4 className="font-headline font-bold text-primary">Singapore</h4>
                                            <p className="text-xs font-body text-outline">APAC Logistics Hub</p>
                                        </div>
                                        <span className="material-symbols-outlined text-outline-variant">arrow_forward_ios</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded border-l-4 border-primary shadow-sm">
                                        <div>
                                            <h4 className="font-headline font-bold text-primary">New York</h4>
                                            <p className="text-xs font-body text-outline">Americas Network Office</p>
                                        </div>
                                        <span className="material-symbols-outlined text-outline-variant">arrow_forward_ios</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Map Visualization Section --> */}
                <section className="bg-surface-container-low py-20 px-8">
                    <div className="max-w-[1440px] mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <h2 className="font-headline text-3xl font-bold text-primary mb-2">Global Presence</h2>
                                <p className="font-body text-on-surface-variant max-w-md">Our integrated network spans across 140+ countries, ensuring precision movement of your assets anywhere in the world.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded shadow-sm">
                                    <span className="w-3 h-3 rounded-full bg-secondary"></span>
                                    <span className="font-label text-xs font-bold text-primary">Main Hubs</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded shadow-sm">
                                    <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                                    <span className="font-label text-xs font-bold text-primary">Service Nodes</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden grayscale contrast-125 border border-outline-variant/10 shadow-xl bg-primary">
                            <img className="w-full h-full object-cover opacity-50" data-alt="abstract world map rendered with illuminated nodes and global connectivity lines against a deep dark navy background" data-location="Global" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1fruh04Dnr7tT3W1rkhEjGqWi8Az8JeMskseLwLIdXalrlXRm2qVpD_1D4lk5__w5JLIhHauCX4-4I2ZoDFP4kJpi2zgl5pTr6d-47jFRh_XRX5nOjzAf9ZulhhlBtklos-0YYOWZJhILpjp9ELQXMkcwGseLg765xXA6c2MjKnElmcyCWL19ThMohX2TI-K_iWzXXmhIJUwU7ua9FeoeuLk4dLRRi7imn_6B7ueMcrQ6EUYrcEYKZJi5ghR-_j5GVUrhUy5bIPiV" />
                            <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>
                            {/* <!-- Mock Map Markers --> */}
                            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_15px_#fe6b00]"></div>
                            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_15px_#fe6b00]"></div>
                            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_15px_#fe6b00]"></div>
                        </div>
                    </div>
                </section>
                {/* <!-- Direct Support Channels (Bento Grid Style) --> */}
                <section className="py-24 px-8 md:px-12 max-w-[1440px] mx-auto">
                    <h2 className="font-headline text-3xl font-bold text-primary text-center mb-16">Direct Support Channels</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* <!-- Customer Support --> */}
                        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-lg group hover:border-secondary/30 transition-all">
                            <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded mb-6 text-white">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-3">Customer Support</h3>
                            <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">24/7 technical and shipment support for active logistics contracts.</p>
                            <a className="font-label text-sm font-bold text-secondary flex items-center gap-2 group-hover:translate-x-2 transition-transform" href="mailto:support@transpro.com">
                                support@transpro.com
                                <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </a>
                        </div>
                        {/* <!-- Media Inquiries --> */}
                        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-lg group hover:border-secondary/30 transition-all">
                            <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded mb-6 text-white">
                                <span className="material-symbols-outlined">news</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-3">Media Inquiries</h3>
                            <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">Resources for press and official brand assets for publications.</p>
                            <a className="font-label text-sm font-bold text-secondary flex items-center gap-2 group-hover:translate-x-2 transition-transform" href="mailto:media@transpro.com">
                                media@transpro.com
                                <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </a>
                        </div>
                        {/* <!-- Career Center --> */}
                        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-lg group hover:border-secondary/30 transition-all">
                            <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded mb-6 text-white">
                                <span className="material-symbols-outlined">work</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-3">Career Center</h3>
                            <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">Join our global team of logistics architects and engineers.</p>
                            <a className="font-label text-sm font-bold text-secondary flex items-center gap-2 group-hover:translate-x-2 transition-transform" href="mailto:careers@transpro.com">
                                careers@transpro.com
                                <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default page