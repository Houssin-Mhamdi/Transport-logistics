const stats = [
  { value: "12M+", label: "Delivered Cargo" },
  { value: "140+", label: "Global Locations" },
  { value: "3,500+", label: "Industry Clients" },
  { value: "24/7", label: "Expert Support" },
];

export default function StatsBanner() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-primary-fixed-dim uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}