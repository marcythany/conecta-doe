import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import Footer from '@/components/layout/Footer';
import Shell from '@/components/layout/Shell';
import { routing } from '@/i18n/routing';

import '../globals.css';

type Props = {
	children: ReactNode;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta');

	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
		},
	};
}

export default async function LocaleLayout({ children }: Props) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} data-scroll-behavior='smooth'>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<a className='skip-link' href='#main-content'>
						Pular para conteúdo / Skip to content
					</a>

					<Shell>{children}</Shell>

					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
