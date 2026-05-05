import "./ProductCard.css";

function ProductCard({ product }) {
  if (!product) return <div className="error">No product data</div>;

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-thumbnail"
        />
        {product.discountPercentage > 0 && (
          <div className="discount-badge">-{product.discountPercentage}%</div>
        )}
        {product.stock <= 0 && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>

      <div className="product-info">
        <div className="product-header">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-brand">{product.brand}</span>
        </div>

        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <span className="rating-stars">★ {product.rating}</span>
        </div>

        <div className="product-pricing">
          <span className="original-price">${product.price}</span>
          <span className="discounted-price">${discountedPrice}</span>
        </div>

        <div className="product-footer">
          <span className={`stock ${product.stock > 0 ? "in-stock" : "out"}`}>
            Stock: {product.stock}
          </span>
          <button
            className={`add-to-cart-btn ${product.stock <= 0 ? "disabled" : ""}`}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
