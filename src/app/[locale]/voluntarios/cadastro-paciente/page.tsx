import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CommunityRegistrationForm from '@/components/volunteers/CommunityRegistrationForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('registration');
  return { title: `${t('patientTitle')} | Conecta Doe`, description: t('patientDescription') };
}

export default function PatientRegistrationPage() {
  return (
    <main id="main-content" className="section-pad container-shell">
      <CommunityRegistrationForm type="patient" />
    </main>
  );
}
