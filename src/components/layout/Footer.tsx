import { Leaf, Recycle, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Brand from '@/components/ui/Brand';

export default async function Footer() {
  const t = await getTranslations('footer');
  const n = await getTranslations('nav');
  const pillars = [
    { Icon: Leaf, text: t('earth') },
    { Icon: ShieldCheck, text: t('safe') },
    { Icon: Recycle, text: t('reuse') },
  ];
  const links = [
    ['/sobre', n('about')],
    ['/como-funciona', n('how')],
    ['/equipamentos', n('equipment')],
    ['/voluntarios', n('volunteers')],
    ['/doar', n('donate')],
  ] as const;

  return (
    <footer>
      <div className="bg-[#08775D] text-white">
        <div className="container-shell grid gap-5 py-6 md:grid-cols-3">
          {pillars.map(({ Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 md:border-r md:border-white/30 md:last:border-r-0">
              <Icon className="shrink-0" size={29} aria-hidden="true" />
              <span className="text-sm font-semibold">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#15324B] text-white">
        <div className="container-shell flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Brand light />
            <p className="mt-2 text-sm text-white/75">{t('description')}</p>
          </div>
          <nav aria-label={n('mainNavigation')} className="flex flex-wrap gap-4 text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="hover:underline">{label}</Link>
            ))}
          </nav>
        </div>
        <div className="container-shell border-t border-white/15 py-4 text-xs text-white/70">
          © 2026 {t('rights')} · {t('privacyMessage')}
        </div>
      </div>
    </footer>
  );
}
