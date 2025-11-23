import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  // fetching all products from api
  const fetchAllProducts = async () => {
    try {
      // const res = await axios.get("../../public/data.json");
      const res = await axios.get("/temp.json");
        //   console.log(res);
        const productsData = res.data;
        setData(productsData)
        // console.log(productsData)
    } catch (error) {
      console.log(error);
    }
  };


  // ! unique category
  const [categories, setCategories] = useState([]);


   

  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const allCategories = data.map((item) => {
        try {
          const parsed = JSON.parse(item.product_category_tree);
          // Example: ["Baby Care >> Baby & Kids Gifts >> Stickers"]
          const categoryPath = parsed[0];
          const firstCategory = categoryPath.split(">>").shift().trim(); // get first category
          return firstCategory;
        } catch {
          return null;
        }
      });

      // Filter out nulls, unique values, and those with length < 10
      const filteredCategories = ['All',
        ...new Set(allCategories.filter((cat) => cat && cat.length < 10)),
      ];

      setCategories(filteredCategories);
    }
  }, [data]);


  const brandOnlyData = data?.map((items, index) => {

    return (items.brand)
    

    
  })

  const uniqueBrand = ['All',...new Set(brandOnlyData)];


  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts, categories, uniqueBrand ,setCategories}}>
      {children}
    </DataContext.Provider>
  );
}

export const getData = () => useContext(DataContext);


