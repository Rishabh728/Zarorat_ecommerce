import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import notfound from "../assets/notFound.json";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import Loading from "../assets/loading4.mp4";
import MobileFilter from "../components/MobileFilter";

const Products = ({ category }) => {
  console.log(category);
  const { data, fetchAllProducts } = getData();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(category || "All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  // ✅ Fixed filtering logic
  const filterData = data?.filter((item) => {
    const matchesSearch = item.product_category_tree
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      item.product_category_tree
        ?.toLowerCase()
        .includes(categoryFilter.toLowerCase());

    const matchesBrand =
      brand === "All" || item.brand?.toLowerCase() === brand.toLowerCase();

    const matchesPrice =
      item.retail_price >= priceRange[0] && item.retail_price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const dynamicPage = Math.ceil(filterData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 my-10">
        <MobileFilter
          
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8 flex-col md:flex-row">
              <FilterSection
                 
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />

              {filterData?.length > 0 ? (
                <div className=" flex flex-col justify-center items-center">
                  <div className="grid md:grid-cols-4 grid-cols-2 mt-10 md:gap-7 gap-2">
                    {filterData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => (
                        <ProductCard key={index} product={product} />
                      ))}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center md:h-[600px]  md:w-[900px] mt-10">
                  <Lottie animationData={notfound} classID="w-[500px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-screen border-2">
            <video muted autoPlay loop className="h-screen ">
              <source src={Loading} />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
