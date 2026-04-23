import { featuredProducts } from './featuredProducts';
import { trendingProducts } from './trendingProducts';
import {
  saleProducts,
  newSessonProducts,
  bagsProducts,
  accessoriesProducts,
} from './categoryProducts';
import {
  menShirts, menJackets, menHat, menShoes, menAccessories, menPullover,
} from './menProducts';
import {
  womenShirts, womenJackets, womenHat, womenShoes, womenAccessories, womenPullover,
} from './womenProducts';
import {
  childrenShirts, childrenJackets, childrenHat, childrenShoes, childrenAccessories,
} from './childrenProducts';

// Each entry carries enough info to build a product link and display a result
const tag = (products, category, type = undefined) =>
  products.map((p) => ({ ...p, category, type }));

export const allProductsIndex = [
  ...tag(featuredProducts, 'featured'),
  ...tag(trendingProducts, 'trending'),
  ...tag(saleProducts, 'sale'),
  ...tag(newSessonProducts, 'newSesson'),
  ...tag(bagsProducts, 'bags'),
  ...tag(accessoriesProducts, 'accessories'),
  ...tag(menShirts, 'men', 'shirts'),
  ...tag(menJackets, 'men', 'Jackets'),
  ...tag(menHat, 'men', 'hat'),
  ...tag(menShoes, 'men', 'shoes'),
  ...tag(menAccessories, 'men', 'accessories'),
  ...tag(menPullover, 'men', 'pullover'),
  ...tag(womenShirts, 'woman', 'shirts'),
  ...tag(womenJackets, 'woman', 'Jackets'),
  ...tag(womenHat, 'woman', 'hat'),
  ...tag(womenShoes, 'woman', 'shoes'),
  ...tag(womenAccessories, 'woman', 'accessories'),
  ...tag(womenPullover, 'woman', 'pullover'),
  ...tag(childrenShirts, 'children', 'shirts'),
  ...tag(childrenJackets, 'children', 'Jackets'),
  ...tag(childrenHat, 'children', 'hat'),
  ...tag(childrenShoes, 'children', 'shoes'),
  ...tag(childrenAccessories, 'children', 'accessories'),
];

export const searchProducts = (query) => {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  return allProductsIndex.filter((p) =>
    p.title.toLowerCase().includes(q)
  );
};
