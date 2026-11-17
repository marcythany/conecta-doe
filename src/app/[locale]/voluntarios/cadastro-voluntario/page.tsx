import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CommunityRegistrationForm from '@/components/volunteers/CommunityRegistrationForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('registration');
  return { title: `${t('volunteerTitle')} | Conecta Doe`, description: t('volunteerDescription') };
}

export default function VolunteerRegistrationPage() {
  return (
    <main id="main-content" className="section-pad container-shell">
      <CommunityRegistrationForm type="volunteer" />
    </main>
  );
}
