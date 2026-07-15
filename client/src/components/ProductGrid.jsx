import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => (
  <div className="product-grid" role="list">
    {products.map((product) => (
      <div key={product.id} role="listitem">
        <ProductCard product={product} />
      </div>
    ))}
  </div>
);

export default ProductGrid;
