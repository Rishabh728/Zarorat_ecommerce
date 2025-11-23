import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {

  const navigate = useNavigate()
  // Parse image field safely

  const { addToCart } = useCart();

  let images = [];
  try {
    if (typeof product.image === "string" && product.image.startsWith("[")) {
      images = JSON.parse(product.image);
    } else if (Array.isArray(product.image)) {
      images = product.image;
    } else {
      images = [];
    }
  } catch (error) {
    console.error("Invalid image format", error);
    images = [];
  }

  const firstImage = images?.[0] || "https://via.placeholder.com/300";

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max flex items-start flex-col justify-between">
      <img
        src={firstImage}
        alt={product.product_name}
        className="bg-gray-100 aspect-square object-cover rounded-lg" onClick={() => {
          navigate(`/products/${product.pid}`)
        }}
      />

      <h1 className="line-clamp-2 p-1 font-semibold text-sm mt-2">
        {product.product_name?.length > 20
          ? product.product_name.slice(0, 20) + "..."
          : product.product_name}
      </h1>

      <p className="my-1 text-lg text-gray-800 font-bold">
        ${product.discounted_price}
        {product.retail_price > product.discounted_price && (
          <span className="text-gray-400 line-through text-sm ml-2">
            ${product.retail_price}
          </span>
        )}
      </p>

      <button className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold" onClick={()=>addToCart(product)}>
        <IoCartOutline className="w-6 h-6" /> Add to Cart
      </button> 
    </div>
  );
};

export default ProductCard;
