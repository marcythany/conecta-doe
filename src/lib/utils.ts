export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCondition(value: string): string {
  const map: Record<string, string> = {
    new: 'Novo',
    excellent: 'Ótimo',
    good: 'Bom',
    fair: 'Regular',
  };
  return map[value] ?? value;
}