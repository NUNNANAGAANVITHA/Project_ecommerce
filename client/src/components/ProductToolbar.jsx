import SortDropdown from './SortDropdown';

const ProductToolbar = ({ resultCount, sortOption, onSortChange, options }) => (
  <div className="toolbar">
    <h2>{resultCount} matching products</h2>
    <SortDropdown value={sortOption} onChange={onSortChange} options={options} />
  </div>
);

export default ProductToolbar;
