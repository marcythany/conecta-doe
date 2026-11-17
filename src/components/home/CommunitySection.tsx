import { ArrowRight, HandHeart, HeartHandshake, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import MaintenanceCampaignCard from './MaintenanceCampaignCard';

export default async function CommunitySection() {
  const t = await getTranslations('community');

  return (
    <section className="section-pad bg-[#EDF6F4]" aria-labelledby="community-section-heading">
      <div className="container-shell">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-[#075B50]">
            {t('eyebrow')}
          </p>
          <h2 id="community-section-heading" className="section-title">{t('heading')}</h2>
          <p className="mt-3 leading-relaxed text-[#435969]">{t('intro')}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="surface-card relative flex flex-col overflow-hidden p-6 sm:p-8">
            <div aria-hidden="true" className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-[#D6F4E7]" />
            <div className="relative flex h-full flex-col">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#D9F3EC] text-[#075B50]">
                <Users size={34} aria-hidden="true" />
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F0F5] px-3 py-1 text-xs font-bold text-[#15324B]">
                  <HandHeart size={14} aria-hidden="true" />
                  {t('helpTag')}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F0F5] px-3 py-1 text-xs font-bold text-[#15324B]">
                  <HeartHandshake size={14} aria-hidden="true" />
                  {t('connectTag')}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-[#15324B] sm:text-3xl">
                {t('title')}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-[#435969]">{t('description')}</p>
              <Link href="/voluntarios" className="primary-btn mt-7 self-start">
                {t('cta')} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/voluntarios/cadastro-voluntario" className="rounded-full border border-[#9FC9BB] px-4 py-2 text-sm font-bold text-[#075B50] transition hover:bg-[#E4F4ED]">
                  {t('registerVolunteer')}
                </Link>
                <Link href="/voluntarios/cadastro-paciente" className="rounded-full border border-[#9FC9BB] px-4 py-2 text-sm font-bold text-[#075B50] transition hover:bg-[#E4F4ED]">
                  {t('registerPatient')}
                </Link>
              </div>
              <p className="mt-5 text-xs text-[#526674]">{t('demo')}</p>
            </div>
          </article>
          <MaintenanceCampaignCard />
        </div>
      </div>
    </section>
  );
}
