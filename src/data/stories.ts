// HISTÓRIAS DEMONSTRATIVAS — nomes fictícios, exemplos ilustrativos.
export interface Story {
  id: string;
  name: string;
  city: string;
  excerpt: string;
}

export const stories: Story[] = [
  {
    id: 'ana',
    name: 'Ana (exemplo)',
    city: 'Recife, PE',
    excerpt:
      'Encontrou uma cadeira de rodas que ampliou sua autonomia no dia a dia.',
  },
  {
    id: 'joao',
    name: 'João (exemplo)',
    city: 'Porto Alegre, RS',
    excerpt:
      'Recebeu um andador que tornou seus deslocamentos mais seguros.',
  },
];