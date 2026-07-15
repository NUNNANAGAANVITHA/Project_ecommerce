import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import ProductGrid from './ProductGrid';
import ProductSkeleton from './ProductSkeleton';
import ProductToolbar from './ProductToolbar';

const ProductSection = ({ products, loading, error, resultCount, sortOption, onSortChange, sortOptions, onReset, onRetry }) => {
  if (loading) {
    return (
      <section className="product-section">
        <ProductToolbar resultCount={resultCount} sortOption={sortOption} onSortChange={onSortChange} options={sortOptions} />
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-section">
        <ErrorState onRetry={onRetry} />
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="product-section">
        <ProductToolbar resultCount={0} sortOption={sortOption} onSortChange={onSortChange} options={sortOptions} />
        <EmptyState onReset={onReset} />
      </section>
    );
  }

  return (
    <section className="product-section">
      <ProductToolbar resultCount={resultCount} sortOption={sortOption} onSortChange={onSortChange} options={sortOptions} />
      <ProductGrid products={products} />
    </section>
  );
};

export default ProductSection;
