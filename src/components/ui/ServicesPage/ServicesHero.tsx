const HERO_BG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAd-w1z5UDBRzobwKfLAxEZERrMU91NucRYX_YbvJjt6fG17whaL_tlDztOxk6OA3eGP97Zhw6fPlMnm8NFdVXota1i2QLtNBq58mHHkICFo30T2rfJhc2E3k09jidnyKWptPK93zRVlAgzm2UOnGZRJfE62kLT_u3_-UhMWHoyT3fkAOEA2jABH7vadM9cXknk7nLzI1qGKP7p63BYaIqqjhoYd4584znm1d1ti4Mku5XePGXjFVLpbaVBiRHXlzBqgHAtXiaehxsK";

export default function ServicesHero() {
    return (
        <header className="relative overflow-hidden bg-primary py-24 mb-20">
            {/* Background Image */}
            <div
                className="absolute inset-0 opacity-20 w-full h-full object-cover"
                style={{
                    backgroundImage: `url('${HERO_BG}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="max-w-3xl">
                    <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-widest uppercase rounded mb-6">
                        Global Logistics Solutions
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                        Architecting Global <br />
                        <span className="text-secondary-container">Cargo Flows.</span>
                    </h1>
                    <p className="text-xl text-primary-fixed font-light leading-relaxed mb-10 max-w-xl">
                        From high-altitude air freight to deep-sea maritime transport, we design the precision-engineered infrastructure that keeps your business moving.
                    </p>
                </div>
            </div>
        </header>
    );
}