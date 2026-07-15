import products from '../data/products.js';

const DEFAULT_SORT = 'default';
const VALID_SORTS = ['default', 'price_asc', 'price_desc', 'rating_desc', 'name_asc'];

export const getAllProducts = () => products;

export const getFilterMetadata = () => {
  const categories = [...new Set(products.map((product) => product.category))].sort();
  const prices = products.map((product) => Number(product.price) || 0);

  return {
    categories,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    sortingOptions: [
      { value: 'default', label: 'Default' },
      { value: 'price_asc', label: 'Price: Low to High' },
      { value: 'price_desc', label: 'Price: High to Low' },
      { value: 'rating_desc', label: 'Top Rated First' },
      { value: 'name_asc', label: 'Name: A to Z' },
    ],
  };
};

export const filterProducts = (inventory, filters = {}) => {
  const baseInventory = Array.isArray(inventory) ? inventory : [];
  const normalizedFilters = {
    categories: Array.isArray(filters.categories) ? filters.categories : [],
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: filters.minRating,
  };

  const selectedCategories = normalizedFilters.categories
    .map((value) => String(value).trim())
    .filter(Boolean);

  const minPrice = normalizedFilters.minPrice === undefined ? undefined : Number(normalizedFilters.minPrice);
  const maxPrice = normalizedFilters.maxPrice === undefined ? undefined : Number(normalizedFilters.maxPrice);
  const minRating = normalizedFilters.minRating === undefined ? undefined : Number(normalizedFilters.minRating);

  const hasAnyFilters = selectedCategories.length > 0 || minPrice !== undefined || maxPrice !== undefined || minRating !== undefined;

  if (!hasAnyFilters) {
    return [...baseInventory];
  }

  return baseInventory.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const productPrice = Number(product.price) || 0;
    const productRating = Number(product.rating) || 0;

    const matchesPrice =
      (minPrice === undefined || productPrice >= minPrice) && (maxPrice === undefined || productPrice <= maxPrice);

    const matchesRating = minRating === undefined || productRating >= minRating;

    return matchesCategory && matchesPrice && matchesRating;
  });
};

export const sortProducts = (inventory, sortOption = DEFAULT_SORT) => {
  const baseInventory = Array.isArray(inventory) ? inventory : [];
  const normalizedSort = typeof sortOption === 'string' ? sortOption.trim() : DEFAULT_SORT;

  if (!VALID_SORTS.includes(normalizedSort)) {
    return [...baseInventory];
  }

  const sortedProducts = [...baseInventory];

  if (normalizedSort === DEFAULT_SORT) {
    return sortedProducts;
  }

  sortedProducts.sort((left, right) => {
    switch (normalizedSort) {
      case 'price_asc':
        return (Number(left.price) || 0) - (Number(right.price) || 0) || left.name.localeCompare(right.name);
      case 'price_desc':
        return (Number(right.price) || 0) - (Number(left.price) || 0) || left.name.localeCompare(right.name);
      case 'rating_desc':
        return (Number(right.rating) || 0) - (Number(left.rating) || 0) || left.name.localeCompare(right.name);
      case 'name_asc':
        return left.name.localeCompare(right.name);
      default:
        return 0;
    }
  });

  return sortedProducts;
};

export const applyProductFilters = (inventory, filters = {}) => {
  const filteredProducts = filterProducts(inventory, filters);
  return sortProducts(filteredProducts, filters.sort || DEFAULT_SORT);
};
