import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VolunteerMatcher from '@/components/volunteers/VolunteerMatcher';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('volunteers');
  return {
    title: `${t('title')} | Conecta Doe`,
    description: t('subtitle'),
  };
}

export default async function VolunteersPage() {
  const t = await getTranslations('volunteers');
  return (
    <main id="main-content">
      <section className="bg-gradient-to-br from-[#EAF7F4] via-[#F3F9F8] to-[#E6EFF7] py-14 sm:py-20">
        <div className="container-shell max-w-4xl text-center">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-widest text-[#075B50]">{t('eyebrow')}</p>
          <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#15324B]">
            {t('title')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#3F5769]">{t('subtitle')}</p>
          <p className="mx-auto mt-4 max-w-2xl rounded-xl bg-white/85 px-5 py-3 text-sm font-semibold text-[#075B50]">
            {t('demo')}
          </p>
        </div>
      </section>
      <section className="section-pad container-shell" aria-label={t('explore')}>
        <VolunteerMatcher />
      </section>
      <section className="border-t border-[#DFEAE7] bg-[#F2F8F7] py-12">
        <div className="container-shell max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold text-[#15324B]">{t('safetyTitle')}</h2>
          <p className="mt-3 leading-relaxed text-[#435969]">{t('safetyDescription')}</p>
        </div>
      </section>
    </main>
  );
}
