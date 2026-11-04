import {getTranslations} from 'next-intl/server';import EquipmentForm from '@/components/forms/EquipmentForm';import type {Metadata} from 'next';
export async function generateMetadata():Promise<Metadata>{return {title:'Doar | Conecta Doe'}}
export default async function FormPage(){const t=await getTranslations('form');return <main id="main-content" className="section-pad container-shell"><div className="mx-auto mb-9 max-w-3xl"><h1 className="section-title">{t('donateTitle')}</h1><p className="mt-3 text-lg">{t('donateIntro')}</p></div><EquipmentForm mode="donate"/></main>}
