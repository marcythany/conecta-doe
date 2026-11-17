'use client';

import { useState } from 'react';
import { Accessibility, Heart, Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Brand from '@/components/ui/Brand';

export default function Header({ onAccessibility }: { onAccessibility: () => void }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = [
    ['/', t('home')],
    ['/como-funciona', t('how')],
    ['/equipamentos', t('equipment')],
    ['/voluntarios', t('volunteers')],
    ['/sobre', t('about')],
  ] as const;

  function isCurrent(href: string) {
    return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#DDEBE9] bg-white/95 backdrop-blur-md">
      <div className="container-shell flex min-h-20 items-center justify-between gap-3">
        <Brand />
        <nav className="hidden items-center gap-4 xl:flex" aria-label={t('mainNavigation')}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={isCurrent(href) ? 'page' : undefined}
              className="text-sm font-semibold text-[#15324B] transition hover:text-[#08775D]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <select
            aria-label={t('language')}
            value={locale}
            onChange={(event) => { router.replace(pathname, { locale: event.target.value }); setOpen(false); }}
            className="rounded-xl border border-slate-200 bg-white p-2 text-sm font-semibold text-[#15324B]"
          >
            <option value="pt-BR">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          <button
            type="button"
            onClick={onAccessibility}
            aria-label={t('accessibility')}
            title={t('accessibility')}
            className="rounded-xl border border-slate-200 p-2.5 text-[#075B50]"
          >
            <Accessibility size={20} aria-hidden="true" />
          </button>
          <Link href="/doar" className="hidden items-center rounded-full bg-[#F2A65A] px-4 py-3 text-sm font-bold text-[#15324B] transition hover:bg-[#ffd094] sm:inline-flex">
            <Heart size={18} className="mr-2" aria-hidden="true" />{t('donate')}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t('close') : t('menu')}
            onClick={() => setOpen((value) => !value)}
            className="rounded-xl border border-slate-200 p-2.5 text-[#15324B] xl:hidden"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="border-t border-slate-100 bg-white px-6 py-4 xl:hidden" aria-label={t('mobileNavigation')}>
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {[...links, ['/doar', t('donate')], ['/preciso-de-equipamento', t('request')]].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent(href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-semibold text-[#15324B] hover:bg-[#E7F0F5]"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
