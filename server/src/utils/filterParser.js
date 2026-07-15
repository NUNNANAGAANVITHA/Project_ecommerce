const normalizeCategoryValues = (categories) => {
  if (!categories) return [];

  if (Array.isArray(categories)) {
    return categories
      .map((value) => String(value).trim())
      .filter(Boolean);
  }

  return String(categories)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
};

export const parseProductFilters = (query = {}) => {
  const categories = normalizeCategoryValues(query.categories);
  const minPriceRaw = query.minPrice;
  const maxPriceRaw = query.maxPrice;
  const minRatingRaw = query.minRating;
  const sort = query.sort;

  return {
    categories,
    minPrice: minPriceRaw === undefined || minPriceRaw === '' ? undefined : Number(minPriceRaw),
    maxPrice: maxPriceRaw === undefined || maxPriceRaw === '' ? undefined : Number(maxPriceRaw),
    minRating: minRatingRaw === undefined || minRatingRaw === '' ? undefined : Number(minRatingRaw),
    sort: sort || 'default',
  };
};

export const validateProductFilters = (filters) => {
  const errors = [];
  const { categories, minPrice, maxPrice, minRating, sort } = filters;

  if (categories && categories.length > 0) {
    const invalidCategories = categories.filter((category) => typeof category !== 'string' || category.trim() === '');
    if (invalidCategories.length > 0) {
      errors.push('Category values must be non-empty strings.');
    }
  }

  if (minPrice !== undefined && (Number.isNaN(minPrice) || minPrice < 0)) {
    errors.push('Minimum price must be a non-negative number.');
  }

  if (maxPrice !== undefined && (Number.isNaN(maxPrice) || maxPrice < 0)) {
    errors.push('Maximum price must be a non-negative number.');
  }

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    errors.push('Minimum price cannot exceed maximum price.');
  }

  if (minRating !== undefined && (Number.isNaN(minRating) || minRating < 1 || minRating > 5)) {
    errors.push('Minimum rating must be between 1 and 5.');
  }

  const allowedSorts = ['default', 'price_asc', 'price_desc', 'rating_desc', 'name_asc'];
  if (sort !== undefined && !allowedSorts.includes(sort)) {
    errors.push('Invalid sorting option.');
  }

  return errors;
};
