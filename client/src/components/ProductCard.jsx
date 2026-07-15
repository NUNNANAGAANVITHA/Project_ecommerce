const ProductCard = ({ product }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(product.rating));

  return (
    <article className="product-card" aria-label={product.name}>
      <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
      <div className="product-content">
        <div className="product-header">
          <span className="badge">{product.badge || 'Featured'}</span>
          <span className="price">${product.price}</span>
        </div>
        <h3>{product.name}</h3>
        <p className="product-meta">{product.category}</p>
        <div className="rating-row">
          <div aria-label={`${product.rating} out of 5 stars`}>
            {stars.map((filled, index) => (
              <span key={`${product.id}-${index}`}>{filled ? '★' : '☆'}</span>
            ))}
          </div>
          <span>{product.reviewCount} reviews</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
