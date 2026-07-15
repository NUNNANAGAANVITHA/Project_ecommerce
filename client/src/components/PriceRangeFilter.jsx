const PriceRangeFilter = ({ priceRange, onPriceChange, minPrice, maxPrice }) => {
  const handleMinChange = (event) => {
    const nextValue = Number(event.target.value);
    onPriceChange((current) => ({
      ...current,
      min: Math.min(nextValue, current.max),
    }));
  };

  const handleMaxChange = (event) => {
    const nextValue = Number(event.target.value);
    onPriceChange((current) => ({
      ...current,
      max: Math.max(nextValue, current.min),
    }));
  };

  return (
    <div className="filter-section">
      <h3>Price Range</h3>
      <div className="price-inputs">
        <label>
          <span>Min</span>
          <input type="number" min={minPrice} max={maxPrice} value={priceRange.min} onChange={handleMinChange} />
        </label>
        <label>
          <span>Max</span>
          <input type="number" min={minPrice} max={maxPrice} value={priceRange.max} onChange={handleMaxChange} />
        </label>
      </div>
      <div className="range-row">
        <input type="range" min={minPrice} max={maxPrice} value={priceRange.min} onChange={handleMinChange} />
        <input type="range" min={minPrice} max={maxPrice} value={priceRange.max} onChange={handleMaxChange} />
        <div className="range-values">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
