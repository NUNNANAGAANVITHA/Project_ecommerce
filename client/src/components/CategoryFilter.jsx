const CategoryFilter = ({ categories = [], selectedCategories = [], onCategoryChange }) => {
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((item) => item !== category));
      return;
    }

    onCategoryChange([...selectedCategories, category]);
  };

  return (
    <div className="filter-section">
      <h3>Categories</h3>
      <div className="filter-chip-list" role="group" aria-label="Category filters">
        {categories.map((category) => (
          <label className="checkbox-row" key={category}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
