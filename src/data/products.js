// Mock product data for Alma Liviana — boutique t-shirts.
// Replace with Firestore queries via src/firebase/products.js.

const img = (seed) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

const products = [
  {
    id: 't-001',
    name: 'Camiseta Oversized Crema',
    description:
      'Una camiseta oversized en algodón orgánico, de caída suave y tacto delicado. Pensada para días lentos y mañanas tibias.',
    category: 'Oversized',
    price: 25000,
    stock: 12,
    image: img('photo-1521572163474-6864f9cf17ab'),
    featured: true,
    active: true,
  },
  {
    id: 't-002',
    name: 'Camiseta Minimal Beige',
    description:
      'Diseño minimalista en tono beige cálido. Corte recto, costuras impecables y un acabado mate que abraza la piel.',
    category: 'Básicas',
    price: 22000,
    stock: 18,
    image: img('photo-1503342217505-b0a15ec3261c'),
    featured: true,
    active: true,
  },
  {
    id: 't-003',
    name: 'Camiseta Soft Mauve',
    description:
      'Tono malva suave, ideal para combinaciones tonales. Algodón peinado, ligero y respirable.',
    category: 'Color',
    price: 24000,
    stock: 9,
    image: img('photo-1583743814966-8936f5b7be1a'),
    featured: true,
    active: true,
  },
  {
    id: 't-004',
    name: 'Camiseta Liviana Blanca',
    description:
      'La blanca esencial: pura, ligera y elegante. Una pieza fundamental del armario Alma Liviana.',
    category: 'Básicas',
    price: 21000,
    stock: 25,
    image: img('photo-1554568218-0f1715e72254'),
    featured: false,
    active: true,
  },
  {
    id: 't-005',
    name: 'Camiseta Boutique Arena',
    description:
      'Inspirada en la arena tibia al atardecer. Caída fluida y silueta favorecedora.',
    category: 'Oversized',
    price: 26000,
    stock: 7,
    image: img('photo-1562157873-818bc0726f68'),
    featured: true,
    active: true,
  },
  {
    id: 't-006',
    name: 'Camiseta Editorial Cocoa',
    description:
      'Tono cocoa profundo, acabado premium. Para quienes aman el minimalismo cálido.',
    category: 'Color',
    price: 27000,
    stock: 5,
    image: img('photo-1618354691373-d851c5c3a990'),
    featured: false,
    active: true,
  },
  {
    id: 't-007',
    name: 'Camiseta Calma Marfil',
    description:
      'Una pieza serena en marfil. Hecha para sentirse en casa, sin perder elegancia.',
    category: 'Básicas',
    price: 23000,
    stock: 14,
    image: img('photo-1576566588028-4147f3842f27'),
    featured: false,
    active: true,
  },
  {
    id: 't-008',
    name: 'Camiseta Aura Dorada',
    description:
      'Sutilmente dorada, refleja la luz como una caricia. Edición limitada Alma Liviana.',
    category: 'Color',
    price: 29000,
    stock: 4,
    image: img('photo-1539109136881-3be0616acf4b'),
    featured: true,
    active: true,
  },
];

export default products;

export const getCategories = () => [
  'Todas',
  ...Array.from(new Set(products.map((p) => p.category))),
];

export const getFeatured = () => products.filter((p) => p.featured && p.active);

export const getById = (id) => products.find((p) => p.id === id);
