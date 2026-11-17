import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, HandHeart, UsersRound } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import VolunteerMatcher from '@/components/volunteers/VolunteerMatcher';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('volunteers');
  return { title: `${t('title')} | Conecta Doe`, description: t('subtitle') };
}

export default async function VolunteersPage() {
  const t = await getTranslations('volunteers');
  const r = await getTranslations('registration');

  return (
    <main id="main-content">
      <section className="bg-gradient-to-br from-[#EAF7F4] via-[#F3F9F8] to-[#E6EFF7] py-14 sm:py-20">
        <div className="container-shell max-w-4xl text-center">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-widest text-[#075B50]">{t('eyebrow')}</p>
          <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#15324B]">{t('title')}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#3F5769]">{t('subtitle')}</p>
          <p className="mx-auto mt-4 max-w-2xl rounded-xl bg-white/85 px-5 py-3 text-sm font-semibold text-[#075B50]">{t('demo')}</p>
        </div>
      </section>
      <section className="section-pad container-shell" aria-labelledby="registration-heading">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 id="registration-heading" className="section-title">{r('chooseTitle')}</h2>
          <p className="mt-3 text-[#435969]">{r('chooseDescription')}</p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="surface-card flex flex-col p-6 sm:p-8">
            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#E1F4EA] text-[#075B50]"><HandHeart size={30} aria-hidden="true" /></div>
            <h3 className="text-2xl font-extrabold text-[#15324B]">{r('volunteerTitle')}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-[#435969]">{r('volunteerDescription')}</p>
            <Link href="/voluntarios/cadastro-voluntario" className="primary-btn mt-6 self-start">{r('volunteerCTA')} <ArrowRight size={18} aria-hidden="true" /></Link>
          </article>
          <article className="surface-card flex flex-col p-6 sm:p-8">
            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#E8F0F8] text-[#15324B]"><UsersRound size={30} aria-hidden="true" /></div>
            <h3 className="text-2xl font-extrabold text-[#15324B]">{r('patientTitle')}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-[#435969]">{r('patientDescription')}</p>
            <Link href="/voluntarios/cadastro-paciente" className="outline-btn mt-6 self-start">{r('patientCTA')} <ArrowRight size={18} aria-hidden="true" /></Link>
          </article>
        </div>
      </section>
      <section className="section-pad container-shell border-t border-[#DFEAE7]" aria-label={t('explore')}>
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
