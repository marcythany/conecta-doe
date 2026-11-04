import Brand from '@/components/ui/Brand';
import { Link } from '@/i18n/navigation';
import { Leaf, Recycle, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
export default async function Footer() {
	const t = await getTranslations('footer');
	const n = await getTranslations('nav');
	return (
		<footer>
			<div className='bg-[#08775D] text-white'>
				<div className='container-shell grid gap-5 py-6 md:grid-cols-3'>
					{[
						[Leaf, t('earth')],
						[ShieldCheck, t('safe')],
						[Recycle, t('reuse')],
					].map(([Icon, label], i) => {
						const I = Icon as typeof Leaf;
						return (
							<div
								key={i}
								className='flex items-center gap-3 md:border-r md:border-white/30 md:last:border-r-0'
							>
								<I className='shrink-0' size={29} />
								<span className='text-sm font-semibold'>{label as string}</span>
							</div>
						);
					})}
				</div>
			</div>
			<div className='bg-[#15324B] text-white'>
				<div className='container-shell flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between'>
					<div>
						<Brand light />
						<p className='mt-2 text-sm text-white/75'>{t('description')}</p>
					</div>
					<nav
						aria-label='Links institucionais'
						className='flex flex-wrap gap-4 text-sm'
					>
						{[
							['/sobre', n('about')],
							['/como-funciona', n('how')],
							['/equipamentos', n('equipment')],
							['/doar', n('donate')],
						].map(([href, label]) => (
							<Link key={href} href={href} className='hover:underline'>
								{label}
							</Link>
						))}
					</nav>
				</div>
				<div className='container-shell border-t border-white/15 py-4 text-xs text-white/70'>
					© {2026} {t('rights')} · {t('privacyMessage')}
				</div>
			</div>
		</footer>
	);
}
