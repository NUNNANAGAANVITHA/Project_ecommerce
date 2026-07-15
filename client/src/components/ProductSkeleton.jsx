const ProductSkeleton = () => (
  <div className="skeleton-card" aria-hidden="true">
    <div className="skeleton-image" />
    <div style={{ padding: '1rem' }}>
      <div className="skeleton-line" style={{ width: '70%' }} />
      <div className="skeleton-line" style={{ width: '40%' }} />
      <div className="skeleton-line" style={{ width: '55%' }} />
      <div className="skeleton-line" style={{ width: '85%' }} />
    </div>
  </div>
);

export default ProductSkeleton;
