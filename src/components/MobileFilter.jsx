import React, {useState} from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSection from "./FilterSection";

const MobileFilter = ({

  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  setCategoryFilter,
  categoryFilter,
  handleBrandChange,
  handleCategoryChange,
}) => {
    const [openFilter, setOpenFilter] = useState(false);
  
  return (
    <>
      <div className=" bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 -my-5  ">
        <h1 className=" font-semibold text-xl text-gray-600">Filters</h1>
        <FaFilter
          className=" text-gray-600 "
          onClick={() => setOpenFilter(true)}
        />
      </div>
      {openFilter ? (
        <div className=" bg-gray-100 p-2 md:hidden">
          <button onClick={()=>setOpenFilter(false)} className=" py-3 px-8 bg-red-500 rounded-xl text-white mt-2 w-full">
           Close Filter
          </button>
          <FilterSection
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
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
          
        </div>
      ) : null}
    </>
  );
};

export default MobileFilter;
