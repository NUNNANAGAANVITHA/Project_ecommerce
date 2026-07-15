const EmptyState = ({ onReset }) => (
  <div className="empty-state" role="status">
    <div className="empty-icon">🛍️</div>
    <h3>No items match your criteria.</h3>
    <p>Try broadening your filters to see more products.</p>
    <button type="button" className="retry-button" onClick={onReset}>
      Reset Filters
    </button>
  </div>
);

export default EmptyState;
