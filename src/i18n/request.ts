import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locale as getRootLocale } from 'next/root-params';

import { routing } from './routing';

import en from '../messages/en.json';
import es from '../messages/es.json';
import ptBR from '../messages/pt-BR.json';

const messages = {
	'pt-BR': ptBR,
	en,
	es,
};

export default getRequestConfig(async ({ locale: override }) => {
	const candidate = override ?? (await getRootLocale());

	if (!hasLocale(routing.locales, candidate)) {
		notFound();
	}

	return {
		locale: candidate,
		messages: messages[candidate],
	};
});
