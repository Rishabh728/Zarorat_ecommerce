// import React, { useContext, useEffect } from 'react'
// import {getData} from '../context/DataContext'

// const Category = () => {
//     const { data, fetchAllProducts } = getData()
//     // console.log(data)

//     const getUniqueCategory = (data, property) => {
//         // console.log(property)
//         let newVA1 = data?.map((curElem) => {
//             console.log(curElem)
//             return curElem[property]
//         })
//       return newVA1
//   }

//     const categoryOnlyData = getUniqueCategory(data, "product_category_tree")
//   // console.log(categoryOnlyData)

//   useEffect(() => {
//     fetchAllProducts()
//   })

//   return (
//     <div>Category</div>
//   )
// }

// export default Category





// !


import React from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { categories } = getData();
  const navigate = useNavigate();

  return (
    <div className="bg-[#101829] ">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center md:justify-around justify-center py-7 px-4 h-full">
        {categories?.slice(0, 5).map((item, index) => (
          <button 
            key={index}
            className="uppercase bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
            onClick={() => navigate(`/category/${item}`)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
