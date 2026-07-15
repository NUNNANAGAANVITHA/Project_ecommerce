import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';
import RatingFilter from './RatingFilter';
import ResetFiltersButton from './ResetFiltersButton';

const FilterSidebar = ({
  categories,
  selectedCategories,
  priceRange,
  minimumRating,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onReset,
  onCloseFilters,
  isMobile,
  minPrice,
  maxPrice,
}) => {
  const content = (
    <>
      <div className="filter-panel-title">
        <h2>Filters</h2>
        {isMobile && (
          <button type="button" className="reset-button" style={{ width: 'auto', padding: '0.45rem 0.75rem' }} onClick={onCloseFilters}>
            Close
          </button>
        )}
      </div>
      <CategoryFilter categories={categories} selectedCategories={selectedCategories} onCategoryChange={onCategoryChange} />
      <PriceRangeFilter priceRange={priceRange} onPriceChange={onPriceChange} minPrice={minPrice} maxPrice={maxPrice} />
      <RatingFilter minimumRating={minimumRating} onRatingChange={onRatingChange} />
      <ResetFiltersButton onReset={onReset} />
    </>
  );

  if (!isMobile) {
    return <aside className="filter-sidebar">{content}</aside>;
  }

  return (
    <div className="filter-drawer" role="dialog" aria-modal="true" aria-label="Filter drawer">
      <div className="filter-drawer-panel">{content}</div>
    </div>
  );
};

export default FilterSidebar;
