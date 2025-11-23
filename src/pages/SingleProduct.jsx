import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../context/DataContext";
import Loading from "../assets/loading4.mp4";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState("");

  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();


  const params = useParams();
  console.log(params);

  //! accessing data by using useContext hook
  const { data } = getData();

  const getSingleProduct = async (params) => {
    try {
      const singleData = data
        .map((data) => data)
        .filter((Data) => {
          return Data.pid === params.id;
        });
      console.log(singleProduct);
      setSingleProduct(singleData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct(params);
  }, []);
  console.log(singleProduct);

  // ! discount %

  const percentageDiscount = Math.ceil(
    singleProduct?.[0]?.retail_price &&
      singleProduct?.[0]?.discounted_price
      ? ((singleProduct[0].retail_price - singleProduct[0].discounted_price) /
        singleProduct[0].retail_price) *
      100
      : 0);

console.log(percentageDiscount);

  
  

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0 ">
          <Breadcrums product_name={singleProduct[0].product_name} />
          <div className=" max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* product image c */}
            <div className=" w-full">
              <img
                src={JSON.parse(singleProduct[0].image)[0]}
                alt={singleProduct[0].product_name}
                className="rounded-full w-full object-contain h-[400px]"
              />
            </div>
            {/* product details */}

            <div className=" flex flex-col gap-6">
              <h1 className=" text-xl md:text-3xl font-bold text-gray-800 ">
                {singleProduct[0].product_name}
              </h1>
              <div className=" text-gray-700">
                {singleProduct[0].product_name.slice(0, 7)}/
                {singleProduct[0].brand}/
                {
                  singleProduct[0].product_category_tree
                    .split(">>")
                    [
                      singleProduct[0].product_category_tree.split(">>")
                        .length - 1
                    ]?.split('"')[0]
                }
              </div>
              <p className=" text-xl text-red-500 font-bold">
                ${singleProduct[0].retail_price}{" "}
                <span className=" line-through text-gray-700 mx-2">
                  ${singleProduct[0].discounted_price} 
                </span>
                <span className=" bg-red-500 text-white px-4 py-2 rounded-full"> {percentageDiscount }% Discount</span>
              </p>

              <p className=" text-gray-600 ">{singleProduct[0].description}</p>
              
              {/* quantity selector */}
              <div className=" flex items-center ">
                <label htmlFor="" className=" text-sm font-medium text-gray-700">Quantity:</label>
                <input type="number" min={1} value={qty} onChange={(e)=>{setQty(Number(e.target.value))}}  className=" w-20 border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                
              </div>

              <div className=" flex gap-4 mt-4">
                <button onClick={()=>addToCart(singleProduct[0])} className=" px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer" ><IoCartOutline className=" w-6 h-6"/> Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen border-2">
          <video muted autoPlay loop className="h-screen ">
            <source src={Loading} />
          </video>
        </div>
      )}
    </>
  );
};

export default React.memo(SingleProduct);
