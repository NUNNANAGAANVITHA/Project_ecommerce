import { applyProductFilters, getAllProducts, getFilterMetadata } from '../services/productService.js';
import { parseProductFilters, validateProductFilters } from '../utils/filterParser.js';

export const getProducts = (req, res, next) => {
  try {
    const filters = parseProductFilters(req.query);
    const validationErrors = validateProductFilters(filters);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
      });
    }

    const allProducts = getAllProducts();
    const filteredProducts = applyProductFilters(allProducts, filters);

    return res.json({
      success: true,
      count: filteredProducts.length,
      filters: {
        categories: filters.categories,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minRating: filters.minRating,
        sort: filters.sort,
      },
      products: filteredProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const getFiltersMetadata = (_req, res, next) => {
  try {
    return res.json({
      success: true,
      data: getFilterMetadata(),
    });
  } catch (error) {
    next(error);
  }
};
