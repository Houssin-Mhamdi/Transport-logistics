import { STATS } from "@/lib/constants";

export default function StatsCounter() {
  return (
    <section className="bg-surface-container-low py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          {STATS.map((stat, index) => (
            <div key={index}>
              <div className="text-6xl font-black text-primary tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-secondary uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}