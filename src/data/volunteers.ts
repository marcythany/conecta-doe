/**
 * Perfis e pedidos inteiramente fictícios. Sem telefone, endereço ou dados médicos.
 * Nenhuma conexão criada nesta demonstração envolve usuários reais.
 */
export const helpAreas = [
  'mobility',
  'digital',
  'errands',
  'community',
] as const;

export type HelpArea = (typeof helpAreas)[number];
export type MatchMode = 'offer' | 'request';

export type CommunityProfile = {
  id: string;
  name: string;
  city: string;
  state: string;
  area: HelpArea;
  initials: string;
  style: 'mint' | 'blue' | 'amber' | 'lilac';
};

export const helpRequests: CommunityProfile[] = [
  {
    id: 'ana', name: 'Ana', city: 'Canoas', state: 'RS',
    area: 'mobility', initials: 'AN', style: 'mint',
  },
  {
    id: 'joao', name: 'João', city: 'Novo Hamburgo', state: 'RS',
    area: 'digital', initials: 'JO', style: 'blue',
  },
  {
    id: 'beatriz', name: 'Beatriz', city: 'São Leopoldo', state: 'RS',
    area: 'errands', initials: 'BE', style: 'lilac',
  },
  {
    id: 'pedro', name: 'Pedro', city: 'Porto Alegre', state: 'RS',
    area: 'community', initials: 'PE', style: 'amber',
  },
];

export const volunteerProfiles: CommunityProfile[] = [
  {
    id: 'luana', name: 'Luana', city: 'Novo Hamburgo', state: 'RS',
    area: 'mobility', initials: 'LU', style: 'mint',
  },
  {
    id: 'rafael', name: 'Rafael', city: 'Canoas', state: 'RS',
    area: 'digital', initials: 'RA', style: 'blue',
  },
  {
    id: 'camila', name: 'Camila', city: 'São Leopoldo', state: 'RS',
    area: 'errands', initials: 'CA', style: 'lilac',
  },
  {
    id: 'diego', name: 'Diego', city: 'Porto Alegre', state: 'RS',
    area: 'community', initials: 'DI', style: 'amber',
  },
];
