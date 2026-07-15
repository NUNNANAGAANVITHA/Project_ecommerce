export const buildProductQuery = ({ categories = [], priceRange = {}, minimumRating, sortOption = 'default' }) => {
  const params = new URLSearchParams();

  if (categories.length > 0) {
    params.set('categories', categories.join(','));
  }

  if (priceRange.min !== undefined && priceRange.min !== null) {
    params.set('minPrice', String(priceRange.min));
  }

  if (priceRange.max !== undefined && priceRange.max !== null) {
    params.set('maxPrice', String(priceRange.max));
  }

  if (minimumRating) {
    params.set('minRating', String(minimumRating));
  }

  if (sortOption) {
    params.set('sort', sortOption);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};
