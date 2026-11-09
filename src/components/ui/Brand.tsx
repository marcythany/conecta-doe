import { Link } from '@/i18n/navigation';
export default function Brand({ light = false }: { light?: boolean }) {
	return (
		<Link
			href='/'
			className={`inline-flex shrink-0 items-center gap-2.5 font-extrabold leading-none ${light ? 'text-white' : 'text-[#15324B]'}`}
			aria-label='Conecta Doe — início'
		>
			<svg
				width='48'
				height='48'
				viewBox='0 0 64 64'
				fill='none'
				aria-hidden='true'
			>
				<path
					d='M32 15C19 1 4 13 6 27c2 13 24 28 26 29'
					stroke='#4EB78E'
					strokeWidth='10'
					strokeLinecap='round'
				/>
				<path
					d='M32 15C45 1 60 13 58 27 56 40 34 55 32 56'
					stroke='#075B50'
					strokeWidth='10'
					strokeLinecap='round'
				/>
				<path
					d='M19 32c4 6 9 10 13 12 6-3 11-8 15-15'
					stroke='#0F5183'
					strokeWidth='8'
					strokeLinecap='round'
				/>
			</svg>
			<span className='text-[1.32rem] tracking-tight'>
				Conecta
				<br />
				<span className={light ? 'text-[#A4E6C5]' : 'text-[#08775D]'}>Doe</span>
			</span>
		</Link>
	);
}
