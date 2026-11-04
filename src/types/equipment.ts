export type EquipmentCategory =
  | 'wheelchair'
  | 'walker'
  | 'cane'
  | 'crutch'
  | 'hospital-bed'
  | 'shower-chair'
  | 'other';

export type EquipmentCondition = 'new' | 'excellent' | 'good' | 'fair';

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  condition: EquipmentCondition;
  city: string;
  state: string;
  description: string;
  additionalInfo?: string;
  images: string[];
  createdAt: string;
}