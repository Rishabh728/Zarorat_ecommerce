import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../context/DataContext';
import Products from './Products';


const CategoryProduct = () => {
    const params = useParams();
    // console.log(params);
    
    const category = params.category;
    // console.log(category)

    const { data, categories } = getData();
    
    console.log(data)
        const categoryItems = data?.filter((item) => {
        // product_category_tree is a JSON string → convert it to array
        const categoryList = JSON.parse(item.product_category_tree);

        // Usually category is at index 0 → we check if it includes required category
        return categoryList[0].toLowerCase().includes(category.toLowerCase());
        });
    
    console.log(categoryItems)
    
  return (
      <div><Products categoryItems={ categoryItems} category={category} /></div>
  )
}

export default CategoryProduct