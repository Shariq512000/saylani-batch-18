import React from "react";

const Card = (props) => {

    const {product} = props

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} className="card-img" />

      <div className="card-body">
        <h2 className="title">{product.title}</h2>
        <p className="brand">{product.brand}</p>

        <p className="description">{product.description}</p>

        <div className="price-section">
          <span className="price">${discountedPrice}</span>
          <span className="old-price">${product.price}</span>
          <span className="discount">-{product.discountPercentage}%</span>
        </div>

        <div className="meta">
          <span>⭐ {product.rating}</span>
          <span>Stock: {product.stock}</span>
        </div>

        <button className="btn">Add to Cart</button>

        <div className="reviews">
          <h4>Reviews</h4>
          {product.reviews.map((review, index) => (
            <div key={index} className="review">
              <strong>{review.reviewerName}</strong>
              <span> ⭐ {review.rating}</span>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default Card;
