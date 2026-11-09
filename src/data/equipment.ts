export const categories = [
	'wheelchair',
	'walker',
	'cane',
	'bed',
	'crutches',
	'shower',
	'other',
] as const;
export type Category = (typeof categories)[number];

/** Uma imagem representativa de cada categoria, em public/images. */
export const categoryImages: Record<Category, string> = {
	wheelchair: '/images/cadeiraderodas.jpg',
	walker: '/images/Andadores.jpg',
	cane: '/images/Bengala.jpg',
	bed: '/images/CamaHospitalar.jpg',
	crutches: '/images/Muleta.webp',
	shower: '/images/cadeiradebanho.webp',
	other: '/images/barradeapoiomovel.webp',
};
export type Equipment = {
	id: string;
	name: string;
	category: Category;
	condition: 'good' | 'excellent' | 'used';
	city: string;
	state: string;
	description: string;
	image: string;
};
export const equipment: Equipment[] = [
	{
		id: 'cadeira-rodas-manual',
		name: 'Cadeira de rodas manual',
		category: 'wheelchair',
		condition: 'good',
		city: 'Porto Alegre',
		state: 'RS',
		description:
			'Cadeira dobrável com apoios para braços e pés; item fictício para demonstração.',
		image: '/images/cadeiraderodas.jpg',
	},
	{
		id: 'andador-aluminio',
		name: 'Andador de alumínio',
		category: 'walker',
		condition: 'excellent',
		city: 'Novo Hamburgo',
		state: 'RS',
		description:
			'Andador regulável em altura, exemplo de equipamento de apoio.',
		image: '/images/Andadores.jpg',
	},
	{
		id: 'bengala-ajustavel',
		name: 'Bengala ajustável',
		category: 'cane',
		condition: 'good',
		city: 'Canoas',
		state: 'RS',
		description:
			'Bengala leve com ponteira antiderrapante; anúncio ilustrativo.',
		image: '/images/Bengala.jpg',
	},
	{
		id: 'cama-hospitalar',
		name: 'Cama hospitalar articulada',
		category: 'bed',
		condition: 'used',
		city: 'São Leopoldo',
		state: 'RS',
		description:
			'Cama articulada com grades laterais; disponibilidade apenas fictícia.',
		image: '/images/CamaHospitalar.jpg',
	},
	{
		id: 'muletas-canadenses',
		name: 'Par de muletas canadenses',
		category: 'crutches',
		condition: 'good',
		city: 'Gravataí',
		state: 'RS',
		description: 'Muletas com regulagem de altura, modelo demonstrativo.',
		image: '/images/Muleta.webp',
	},
	{
		id: 'cadeira-de-banho',
		name: 'Cadeira de banho',
		category: 'shower',
		condition: 'excellent',
		city: 'Esteio',
		state: 'RS',
		description:
			'Cadeira para higiene com estrutura resistente, exemplo fictício.',
		image: '/images/cadeiradebanho.webp',
	},
	{
		id: 'cadeira-motorizada',
		name: 'Cadeira de rodas motorizada',
		category: 'wheelchair',
		condition: 'used',
		city: 'Sapucaia do Sul',
		state: 'RS',
		description:
			'Equipamento motorizado fictício para ilustrar diferentes necessidades.',
		image: '/images/cadeiraderodasmotorizada.webp',
	},
	{
		id: 'barra-apoio',
		name: 'Barra de apoio móvel',
		category: 'other',
		condition: 'good',
		city: 'Campo Bom',
		state: 'RS',
		description: 'Equipamento demonstrativo de apoio à mobilidade.',
		image: '/images/barradeapoiomovel.webp',
	},
];
