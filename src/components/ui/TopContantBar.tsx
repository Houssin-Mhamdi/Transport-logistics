import { phoneNumber, email } from '@/lib/constants'

function TopContantBar() {
    return (
        <div>
            {/* Top Contact Bar - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:block bg-gradient-to-r from-slate-200 via-white to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-center gap-8 lg:gap-12">
                        {/* Google Rating */}

                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400"><img src="https://navidex.de/wp-content/uploads/2025/12/Group-50392.png.webp" alt="" /></span>


                        {/* Divider */}
                        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />

                        {/* Email */}
                        <a
                            href={`mailto:${email}`}
                            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-500 transition-colors group"
                        >
                            <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">mail</span>
                            <span className="text-primary dark:text-blue-500 font-semibold">{email}</span>
                        </a>

                        {/* Divider */}
                        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 hidden lg:block" />

                        {/* Phone/WhatsApp */}
                        <a
                            href={`tel:${phoneNumber}`}
                            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-500 transition-colors group hidden lg:flex"
                        >
                            <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">phone</span>
                            <span>Telefon / Whatsapp:</span>
                            <span className="text-primary dark:text-blue-500 font-semibold">{phoneNumber}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Contact Bar - Visible only on mobile */}
            <div className="md:hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="flex items-center justify-between gap-4">
                        {/* Google Rating - Compact */}

                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400"><img src="https://navidex.de/wp-content/uploads/2025/12/Group-50392.png.webp" alt="" /></span>


                        {/* Contact Icons */}
                        <div className="flex items-center gap-3">
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-500 hover:bg-primary/20 dark:hover:bg-blue-500/20 transition-colors"
                                aria-label="Email"
                            >
                                <span className="material-symbols-outlined text-sm">mail</span>
                            </a>
                            <a
                                href={`tel:${phoneNumber}`}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-500 hover:bg-primary/20 dark:hover:bg-blue-500/20 transition-colors"
                                aria-label="Phone"
                            >
                                <span className="material-symbols-outlined text-sm">phone</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopContantBar