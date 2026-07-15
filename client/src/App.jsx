import { useMemo } from 'react';
import Header from './components/Header';
import MarketplaceLayout from './components/MarketplaceLayout';
import { useProducts } from './hooks/useProducts';

function App() {
  const {
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
  } = useProducts();

  const categoryOptions = useMemo(() => filterMetadata.categories || [], [filterMetadata.categories]);

  return (
    <div className="app-shell">
      <Header resultCount={resultCount} />
      <MarketplaceLayout
        products={products}
        loading={loading}
        error={error}
        filterMetadata={filterMetadata}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
        minimumRating={minimumRating}
        sortOption={sortOption}
        resultCount={resultCount}
        isMobileFiltersOpen={isMobileFiltersOpen}
        categoryOptions={categoryOptions}
        onCategoryChange={setSelectedCategories}
        onPriceChange={setPriceRange}
        onRatingChange={setMinimumRating}
        onSortChange={setSortOption}
        onReset={resetFilters}
        onRetry={handleRetry}
        onToggleFilters={toggleFilterDrawer}
        onCloseFilters={() => setIsMobileFiltersOpen(false)}
      />
    </div>
  );
}

export default App;
