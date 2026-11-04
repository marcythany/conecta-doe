// src/components/layout/LocaleContent.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

export async function LocaleContent({ children }: { children: ReactNode }) {
	const messages = await getMessages();
	return (
		<NextIntlClientProvider messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}
