import { useEffect, useMemo, useState } from 'react';
import { fetchFilterMetadata, fetchProducts } from '../services/productApi';
import { buildProductQuery } from '../utils/queryBuilder';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterMetadata, setFilterMetadata] = useState({ categories: [], minPrice: 0, maxPrice: 1000, sortingOptions: [] });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minimumRating, setMinimumRating] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [hasMetadata, setHasMetadata] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(priceRange);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedPriceRange(priceRange), 250);
    return () => window.clearTimeout(timeoutId);
  }, [priceRange.min, priceRange.max]);

  useEffect(() => {
    const controller = new AbortController();

    const loadMetadata = async () => {
      try {
        const payload = await fetchFilterMetadata(controller.signal);
        const { data } = payload;
        setFilterMetadata(data);
        setPriceRange({ min: data.minPrice, max: data.maxPrice });
        setDebouncedPriceRange({ min: data.minPrice, max: data.maxPrice });
        setHasMetadata(true);
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return;
        }
        setError(requestError.message || 'Unable to load products. Please try again.');
        setLoading(false);
      }
    };

    loadMetadata();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!hasMetadata) {
      return undefined;
    }

    const controller = new AbortController();
    const query = buildProductQuery({
      categories: selectedCategories,
      priceRange: debouncedPriceRange,
      minimumRating,
      sortOption,
    });

    const loadProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const payload = await fetchProducts(query, controller.signal);
        setProducts(payload.products || []);
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return;
        }
        setError(requestError.message || 'Unable to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [hasMetadata, selectedCategories, debouncedPriceRange.min, debouncedPriceRange.max, minimumRating, sortOption]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinimumRating('');
    setSortOption('default');
    setPriceRange({ min: filterMetadata.minPrice, max: filterMetadata.maxPrice });
    setDebouncedPriceRange({ min: filterMetadata.minPrice, max: filterMetadata.maxPrice });
    setIsMobileFiltersOpen(false);
  };

  const handleRetry = () => {
    setError('');
    setLoading(true);
    const query = buildProductQuery({ categories: selectedCategories, priceRange: debouncedPriceRange, minimumRating, sortOption });
    const controller = new AbortController();

    fetchProducts(query, controller.signal)
      .then((payload) => {
        setProducts(payload.products || []);
        setLoading(false);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load products. Please try again.');
          setProducts([]);
          setLoading(false);
        }
      });

    return () => controller.abort();
  };

  const toggleFilterDrawer = () => setIsMobileFiltersOpen((current) => !current);

  const resultCount = useMemo(() => products.length, [products.length]);

  return {
    products,
    loading,
    error,
    filterMetadata,
    selectedCategories,
    priceRange,
    minimumRating,
    sortOption,
    resultCount,
    isMobileFiltersOpen,
    setSelectedCategories,
    setPriceRange,
    setMinimumRating,
    setSortOption,
    resetFilters,
    handleRetry,
    toggleFilterDrawer,
    setIsMobileFiltersOpen,
  };
};
