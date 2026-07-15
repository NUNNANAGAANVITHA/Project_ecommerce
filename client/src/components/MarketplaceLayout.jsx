import FilterSidebar from './FilterSidebar';
import ProductSection from './ProductSection';

const MarketplaceLayout = ({
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
  categoryOptions,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onSortChange,
  onReset,
  onRetry,
  onToggleFilters,
  onCloseFilters,
}) => {
  const sortOptions = filterMetadata.sortingOptions || [];

  return (
    <div className="marketplace-layout">
      <div className="mobile-only" style={{ marginBottom: '1rem' }}>
        <button type="button" className="filter-toggle" onClick={onToggleFilters}>
          {isMobileFiltersOpen ? 'Hide Filters' : 'Filters'}
        </button>
      </div>
      {isMobileFiltersOpen && (
        <FilterSidebar
          categories={categoryOptions}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          minimumRating={minimumRating}
          onCategoryChange={onCategoryChange}
          onPriceChange={onPriceChange}
          onRatingChange={onRatingChange}
          onReset={onReset}
          onCloseFilters={onCloseFilters}
          isMobile
          minPrice={filterMetadata.minPrice}
          maxPrice={filterMetadata.maxPrice}
        />
      )}
      <FilterSidebar
        categories={categoryOptions}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
        minimumRating={minimumRating}
        onCategoryChange={onCategoryChange}
        onPriceChange={onPriceChange}
        onRatingChange={onRatingChange}
        onReset={onReset}
        onCloseFilters={onCloseFilters}
        isMobile={false}
        minPrice={filterMetadata.minPrice}
        maxPrice={filterMetadata.maxPrice}
      />
      <ProductSection
        products={products}
        loading={loading}
        error={error}
        resultCount={resultCount}
        sortOption={sortOption}
        onSortChange={onSortChange}
        sortOptions={sortOptions}
        onReset={onReset}
        onRetry={onRetry}
      />
    </div>
  );
};

export default MarketplaceLayout;
