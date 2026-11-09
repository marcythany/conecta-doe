'use client';
import Brand from '@/components/ui/Brand';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Accessibility, Heart, Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
export default function Header({
	onAccessibility,
}: {
	onAccessibility: () => void;
}) {
	const t = useTranslations('nav');
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const links = [
		['/', t('home')],
		['/como-funciona', t('how')],
		['/equipamentos', t('equipment')],
		['/sobre', t('about')],
	] as const;
	return (
		<header className='sticky top-0 z-40 border-b border-[#DDEBE9] bg-white/95 backdrop-blur-md'>
			<div className='container-shell flex min-h-20 items-center justify-between gap-5'>
				<Brand />
				<nav
					className='hidden items-center gap-5 lg:flex'
					aria-label='Navegação principal'
				>
					{links.map(([href, label]) => (
						<Link
							key={href}
							href={href}
							aria-current={pathname === href ? 'page' : undefined}
							className='font-semibold text-[#15324B] transition hover:text-[#08775D]'
						>
							{label}
						</Link>
					))}
				</nav>
				<div className='flex items-center gap-2'>
					<select
						aria-label={t('language')}
						value={locale}
						onChange={(e) =>
							router.replace(pathname, { locale: e.target.value })
						}
						className='rounded-xl border border-slate-200 bg-white p-2 text-sm font-semibold text-[#15324B]'
					>
						<option value='pt-BR'>PT</option>
						<option value='en'>EN</option>
						<option value='es'>ES</option>
					</select>
					<button
						onClick={onAccessibility}
						aria-label='Opções de acessibilidade'
						title='Acessibilidade'
						className='rounded-xl border border-slate-200 p-2.5 text-[#075B50]'
					>
						<Accessibility size={20} />
					</button>
					<Link
						href='/doar'
						className='hidden rounded-full bg-[#F2A65A] px-5 py-3 font-bold text-[#15324B] hover:bg-[#ffd094] sm:inline-flex'
					>
						<Heart size={18} className='mr-2' />
						{t('donate')}
					</Link>
					<button
						aria-expanded={open}
						aria-controls='mobile-navigation'
						aria-label={open ? t('close') : t('menu')}
						onClick={() => setOpen(!open)}
						className='rounded-xl border border-slate-200 p-2.5 lg:hidden'
					>
						{open ?
							<X />
						:	<Menu />}
					</button>
				</div>
			</div>
			{open && (
				<nav
					id='mobile-navigation'
					className='border-t border-slate-100 bg-white px-6 py-4 lg:hidden'
					aria-label='Navegação mobile'
				>
					<div className='mx-auto flex max-w-6xl flex-col gap-1'>
						{[
							...links,
							['/doar', t('donate')],
							['/preciso-de-equipamento', t('request')],
						].map(([href, label]) => (
							<Link
								key={href}
								href={href}
								onClick={() => setOpen(false)}
								className='rounded-lg px-3 py-3 font-semibold hover:bg-[#E7F0F5]'
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
