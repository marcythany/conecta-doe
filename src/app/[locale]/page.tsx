import EquipmentCard from '@/components/equipment/EquipmentCard';
import { categories, equipment } from '@/data/equipment';
import { Link } from '@/i18n/navigation';
import {
	ArrowRight,
	Handshake,
	Heart,
	Leaf,
	Recycle,
	Search,
	UserRound,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
export default async function Home() {
	const t = await getTranslations('home');
	const c = await getTranslations('category');
	return (
		<main id='main-content'>
			<section className='relative overflow-hidden bg-gradient-to-br from-[#EDF8F8] via-[#E7F0F5] to-[#D5F4E4]'>
				<div className='container-shell grid min-h-[530px] items-center gap-10 py-14 lg:grid-cols-[1.08fr_.92fr]'>
					<div className='relative z-10'>
						<p className='mb-5 inline-block rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-[#075B50]'>
							Conecta Doe · Impacto social
						</p>
						<h1 className='text-[clamp(2.8rem,5.5vw,5.3rem)] font-black leading-[1.04] tracking-[-.055em] text-[#15324B]'>
							{t('title1')}
							<br />
							<span className='text-[#08775D]'>{t('title2')}</span>
						</h1>
						<p className='my-7 max-w-xl text-lg font-medium leading-relaxed sm:text-xl'>
							{t('subtitle')}
						</p>
						<div className='flex flex-wrap gap-3'>
							<Link className='primary-btn' href='/doar'>
								<Heart size={19} fill='currentColor' />
								{t('donate')}
							</Link>
							<Link className='outline-btn' href='/preciso-de-equipamento'>
								<Search size={19} />
								{t('request')}
							</Link>
						</div>
					</div>
					<div className='relative min-h-[325px] overflow-hidden rounded-[3rem] rounded-br-[7rem] bg-[#BFE8D3] shadow-xl lg:min-h-[420px]'>
						<Image
							src='/images/hero.jpg'
							alt='Mulher utilizando cadeira de rodas conversa com homem idoso em ambiente arborizado'
							fill
							priority
							sizes='(max-width:1024px) 100vw, 45vw'
							className='object-cover object-center'
						/>
					</div>
				</div>
			</section>
			<section className='section-pad container-shell'>
				<div className='mb-8 text-center'>
					<h2 className='section-title'>{t('categories')}</h2>
					<p className='mt-3 text-slate-600'>{t('catSubtitle')}</p>
				</div>
				<div className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7'>
					{categories.map((key, i) => (
						<Link
							href='/equipamentos'
							key={key}
							className='group flex min-h-40 flex-col items-center justify-center gap-3 rounded-3xl bg-[#E4F3F5] px-3 py-5 text-center transition hover:-translate-y-1 hover:bg-[#D0EBE1]'
						>
							<span className='text-5xl' role='img' aria-label={c(key)}>
								{['♿', '🚶', '🦯', '🛏️', '🩼', '🪑', '🧰'][i]}
							</span>
							<span className='text-sm font-extrabold'>{c(key)}</span>
						</Link>
					))}
				</div>
			</section>
			<section className='container-shell mb-14 rounded-[2rem] bg-[#D9F3EC] px-6 py-10 sm:px-10'>
				<div className='grid items-center gap-8 lg:grid-cols-[.7fr_2fr]'>
					<div>
						<h2 className='section-title'>{t('steps')}</h2>
						<p className='mt-3 text-lg'>{t('stepsSubtitle')}</p>
					</div>
					<div className='grid gap-7 sm:grid-cols-3'>
						{[
							[UserRound, 'step1', 'step1desc'],
							[Handshake, 'step2', 'step2desc'],
							[Heart, 'step3', 'step3desc'],
						].map(([Icon, heading, desc], i) => {
							const I = Icon as typeof Heart;
							return (
								<div key={i} className='relative text-center'>
									<span className='mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#075B50]'>
										<I size={32} />
									</span>
									<span className='absolute left-[calc(50%+21px)] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#08775D] text-sm font-bold text-white'>
										{i + 1}
									</span>
									<h3 className='text-xl font-extrabold'>
										{t(heading as 'step1')}
									</h3>
									<p className='mt-1 text-sm leading-relaxed'>
										{t(desc as 'step1desc')}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			<section className='section-pad bg-white'>
				<div className='container-shell'>
					<div className='mb-8 flex flex-wrap items-end justify-between gap-5'>
						<div>
							<h2 className='section-title'>{t('featured')}</h2>
							<p className='mt-3 text-slate-600'>{t('featuredDesc')}</p>
						</div>
						<Link href='/equipamentos' className='outline-btn'>
							{t('seeAll')}
							<ArrowRight size={17} />
						</Link>
					</div>
					<p className='mb-5 text-xs font-semibold uppercase tracking-wide text-[#075B50]'>
						{t('demo')}
					</p>
					<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
						{equipment.slice(0, 4).map((item) => (
							<EquipmentCard key={item.id} item={item} />
						))}
					</div>
				</div>
			</section>
			<section className='section-pad bg-[#15324B] text-white dark-section'>
				<div className='container-shell grid gap-10 md:grid-cols-2'>
					<div>
						<Leaf size={40} className='mb-5 text-[#BFE8D3]' />
						<h2 className='section-title'>{t('impact')}</h2>
						<p className='mt-5 max-w-lg text-lg text-white/85'>
							{t('impactDesc')}
						</p>
					</div>
					<div className='grid grid-cols-3 gap-3 text-center'>
						{[
							['7', 'impact1'],
							['3', 'impact2'],
							['1', 'impact3'],
						].map(([n, k]) => (
							<div
								key={k}
								className='flex flex-col justify-center rounded-2xl bg-white/10 p-4'
							>
								<b className='text-5xl text-[#BFE8D3]'>{n}</b>
								<span className='mt-3 text-sm'>{t(k as 'impact1')}</span>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className='section-pad container-shell'>
				<div className='mb-7'>
					<h2 className='section-title'>{t('stories')}</h2>
					<p className='mt-3 text-slate-600'>{t('storiesDesc')}</p>
				</div>
				<div className='grid gap-5 md:grid-cols-2'>
					{[
						['♿', 'story1'],
						['🚶', 'story2'],
					].map(([icon, key]) => (
						<div className='surface-card flex items-start gap-5 p-7' key={key}>
							<span className='text-5xl' aria-hidden='true'>
								{icon}
							</span>
							<p className='text-lg font-semibold leading-relaxed'>
								{t(key as 'story1')}
							</p>
						</div>
					))}
				</div>
			</section>
			<section className='bg-[#CFECE0] py-16 text-center'>
				<div className='container-shell'>
					<Recycle size={42} className='mx-auto mb-5 text-[#075B50]' />
					<h2 className='section-title'>{t('cta')}</h2>
					<p className='mx-auto my-5 max-w-xl text-lg'>{t('ctaText')}</p>
					<div className='flex flex-wrap justify-center gap-3'>
						<Link className='primary-btn' href='/doar'>
							{t('donate')}
						</Link>
						<Link className='outline-btn' href='/preciso-de-equipamento'>
							{t('request')}
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
