import React from "react";
import { useTranslations } from 'next-intl';

export default function LeadershipSection() {
  const t = useTranslations('LeadershipSection');

  return (
    <section className="py-24 bg-surface-container-lowest border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-secondary-container z-10"></div>
            <img alt="Hussein Soysal, Founder of Transpro" className="w-full h-[600px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" src="/images/ceo.jpg" />
            <div className="absolute -bottom-8 -right-8 bg-primary p-10 text-white max-w-xs shadow-xl">
              <p className="font-headline font-bold text-lg mb-2">Hussein Soysal</p>
              <p className="text-xs font-label uppercase tracking-[0.2em] text-secondary-container">{t('founder_title')}</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-secondary font-label font-bold uppercase tracking-[0.2em] mb-4 block">{t('subtitle')}</span>
            <h2 className="font-headline font-extrabold text-primary text-4xl mb-8 tracking-tight leading-tight">{t('title')}</h2>
            <div className="relative mb-8">
              <span className="material-symbols-outlined text-6xl text-surface-container absolute -top-10 -left-6 opacity-40">format_quote</span>
              <p className="text-on-surface text-2xl font-body italic leading-relaxed relative z-10">
                {t('quote')}
              </p>
            </div>
            <p className="text-on-surface-variant leading-relaxed mb-8 text-lg">
              {t('description')}
            </p>
            <div className="flex items-center gap-6">
              <div className="h-px w-12 bg-outline"></div>
              <p className="font-headline font-bold text-primary uppercase tracking-widest text-sm">{t('standard')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
