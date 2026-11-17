import { HeartHandshake, ShieldCheck } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { maintenanceCampaign } from '@/data/campaign';

export default async function MaintenanceCampaignCard() {
  const t = await getTranslations('support');
  const locale = await getLocale();
  const { goalInCents, raisedInCents } = maintenanceCampaign;
  const percentage = goalInCents > 0
    ? Math.min(100, Math.max(0, Math.round((raisedInCents / goalInCents) * 100)))
    : 0;
  const currency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

  return (
    <article className="surface-card flex h-full flex-col gap-5 overflow-hidden p-6 sm:p-8" aria-labelledby="support-heading">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E1F2EA] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#075B50]">
            <HeartHandshake size={16} aria-hidden="true" />
            {t('eyebrow')}
          </span>
          <h2 id="support-heading" className="text-2xl font-extrabold tracking-tight text-[#15324B] sm:text-3xl">
            {t('title')}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#435969] sm:text-base">
            {t('description')}
          </p>
        </div>
      </div>
      <div className="mt-auto rounded-2xl bg-[#F0F8F6] p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#496275]">{t('raised')}</p>
            <p className="text-3xl font-black tracking-tight text-[#075B50]">{currency.format(raisedInCents / 100)}</p>
          </div>
          <p className="text-sm font-semibold text-[#496275]">
            {t('goal')}: <span className="font-extrabold text-[#15324B]">{currency.format(goalInCents / 100)}</span>
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm font-bold text-[#15324B]">
          <span>{t('progress')}</span>
          <span className="text-xl font-black tabular-nums text-[#075B50]">{percentage}%</span>
        </div>
        <div
          className="mt-2 h-3 overflow-hidden rounded-full bg-[#D3E5DD]"
          role="progressbar"
          aria-label={t('progressLabel')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          aria-valuetext={t('progressDescription', { percentage })}
        >
          <div className="h-full rounded-full bg-[#08775D]" style={{ width: `${percentage}%` }} />
        </div>
      </div>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-[#4B6070]">
        <ShieldCheck size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
        {t('demo')}
      </p>
    </article>
  );
}
