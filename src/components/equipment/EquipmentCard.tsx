import Image from 'next/image';
import type { Equipment } from '@/data/equipment';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function EquipmentCard({ item }: { item: Equipment }) {
  const t = useTranslations('equipment');
  const c = useTranslations('category');

  return (
    <article className="surface-card overflow-hidden">
      <div className="relative h-48 w-full bg-gradient-to-br from-[#DFF5ED] to-[#E7F0F5]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4"
        />
      </div>

      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-[#08775D]">
          {c(item.category)}
        </span>
        <h3 className="mt-1 text-xl font-extrabold">{item.name}</h3>
        <p className="mt-2 text-sm text-slate-600">{t(item.condition)}</p>
        <p className="mt-2 flex items-center gap-1 text-sm">
          <MapPin size={15} aria-hidden="true" />
          {item.city}, {item.state}
        </p>
        <Link
          href={`/equipamentos/${item.id}`}
          className="mt-5 inline-flex items-center gap-1 font-bold text-[#0F5183] hover:underline"
        >
          {t('details')}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
