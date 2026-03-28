export default function RouteHero() {
    return (
        <section className="px-8 pt-24 pb-6 max-w-[1920px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <span className="text-secondary-container font-bold tracking-widest text-xs uppercase">
                        Precision Logistics
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter mt-2">
                        Route Architect
                    </h1>
                    <p className="text-on-surface-variant max-w-xl mt-4 text-lg">
                        Define complex logistical flows with mathematical certainty. Our engine calculates real-time variables to ensure peak efficiency across your fleet.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-surface-container-low px-6 py-4 rounded-lg border border-outline-variant/20">
                        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tight">
                            Active Engine
                        </p>
                        <p className="text-primary font-black text-2xl">v4.2 PRO</p>
                    </div>
                </div>
            </div>
        </section>
    );
}