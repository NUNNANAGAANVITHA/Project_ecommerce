import { describe, expect, it } from 'vitest';
import products from '../data/products.js';
import { applyProductFilters, filterProducts, getFilterMetadata, sortProducts } from './productService.js';
import { parseProductFilters, validateProductFilters } from '../utils/filterParser.js';

describe('product filtering and sorting', () => {
  it('returns all products when no filters are provided', () => {
    expect(filterProducts(products, {})).toHaveLength(products.length);
  });

  it('filters by one category', () => {
    const result = filterProducts(products, { categories: ['Electronics'] });
    expect(result.every((product) => product.category === 'Electronics')).toBe(true);
  });

  it('filters by multiple categories using OR logic', () => {
    const result = filterProducts(products, { categories: ['Electronics', 'Footwear'] });
    expect(result.every((product) => ['Electronics', 'Footwear'].includes(product.category))).toBe(true);
  });

  it('supports the minimum price boundary', () => {
    const result = filterProducts(products, { minPrice: 129 });
    expect(result.every((product) => Number(product.price) >= 129)).toBe(true);
  });

  it('supports the maximum price boundary', () => {
    const result = filterProducts(products, { maxPrice: 89 });
    expect(result.every((product) => Number(product.price) <= 89)).toBe(true);
  });

  it('supports a price range filter', () => {
    const result = filterProducts(products, { minPrice: 100, maxPrice: 200 });
    expect(result.every((product) => Number(product.price) >= 100 && Number(product.price) <= 200)).toBe(true);
  });

  it('supports minimum rating filtering', () => {
    const result = filterProducts(products, { minRating: 4.5 });
    expect(result.every((product) => Number(product.rating) >= 4.5)).toBe(true);
  });

  it('combines category, price, and rating filters', () => {
    const result = filterProducts(products, { categories: ['Electronics'], minPrice: 100, maxPrice: 500, minRating: 4.3 });
    expect(result.every((product) => product.category === 'Electronics' && Number(product.price) >= 100 && Number(product.price) <= 500 && Number(product.rating) >= 4.3)).toBe(true);
  });

  it('returns an empty array when no products match', () => {
    const result = filterProducts(products, { categories: ['Unknown'], minPrice: 1, maxPrice: 2, minRating: 5 });
    expect(result).toEqual([]);
  });

  it('sorts by price ascending', () => {
    const result = sortProducts(products, 'price_asc');
    expect(result[0].price).toBeLessThanOrEqual(result[1].price);
  });

  it('sorts by price descending', () => {
    const result = sortProducts(products, 'price_desc');
    expect(result[0].price).toBeGreaterThanOrEqual(result[1].price);
  });

  it('sorts by top rated first', () => {
    const result = sortProducts(products, 'rating_desc');
    expect(result[0].rating).toBeGreaterThanOrEqual(result[1].rating);
  });

  it('sorts alphabetically', () => {
    const result = sortProducts(products, 'name_asc');
    expect(result[0].name <= result[1].name).toBe(true);
  });

  it('handles an empty inventory array', () => {
    expect(filterProducts([], {})).toEqual([]);
  });

  it('rejects invalid ratings', () => {
    const errors = validateProductFilters({ minRating: 6 });
    expect(errors).toContain('Minimum rating must be between 1 and 5.');
  });

  it('rejects negative prices', () => {
    const errors = validateProductFilters({ minPrice: -1 });
    expect(errors).toContain('Minimum price must be a non-negative number.');
  });

  it('rejects minimum price greater than maximum price', () => {
    const errors = validateProductFilters({ minPrice: 100, maxPrice: 50 });
    expect(errors).toContain('Minimum price cannot exceed maximum price.');
  });

  it('rejects invalid sorting options', () => {
    const errors = validateProductFilters({ sort: 'foo' });
    expect(errors).toContain('Invalid sorting option.');
  });

  it('treats empty category values as no category filter', () => {
    const result = filterProducts(products, { categories: [] });
    expect(result).toHaveLength(products.length);
  });

  it('does not mutate the original product array', () => {
    const originalSnapshot = [...products];
    applyProductFilters(products, { sort: 'price_asc' });
    expect(products).toEqual(originalSnapshot);
  });

  it('parses filters from the query object', () => {
    const parsed = parseProductFilters({ categories: 'Electronics,Footwear', minPrice: '100', maxPrice: '200', minRating: '4', sort: 'price_asc' });
    expect(parsed).toEqual({ categories: ['Electronics', 'Footwear'], minPrice: 100, maxPrice: 200, minRating: 4, sort: 'price_asc' });
  });

  it('returns filter metadata', () => {
    const metadata = getFilterMetadata();
    expect(metadata.categories).toContain('Electronics');
    expect(metadata.minPrice).toBeLessThanOrEqual(metadata.maxPrice);
    expect(metadata.sortingOptions.length).toBeGreaterThan(0);
  });
});
