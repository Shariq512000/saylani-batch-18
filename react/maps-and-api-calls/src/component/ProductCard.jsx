import React from 'react'

const ProductCard = ({eachProduct}) => {
    // const {eachProduct} = props;
  return (
    <div className="">
        <img src={eachProduct.images[0]} alt="" />
        <h1>{eachProduct.title}</h1>
        <h3>${eachProduct.price}</h3>
        <p>{eachProduct.description}</p>
    </div>
  )
}

export default ProductCard
