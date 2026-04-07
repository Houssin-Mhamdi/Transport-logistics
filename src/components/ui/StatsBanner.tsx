import { useTranslations } from 'next-intl';

export default function StatsBanner() {
  const t = useTranslations('StatsBanner');

  const stats = [
    { value: t('cargo.value'), label: t('cargo.label') },
    { value: t('locations.value'), label: t('locations.label') },
    { value: t('clients.value'), label: t('clients.label') },
    { value: t('support.value'), label: t('support.label') },
  ];

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