import React, { useRef, useEffect } from "react";
import { getData } from "../context/DataContext";

const FilterSection = ({
  openFilter,
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
  const { categories, data, uniqueBrand } = getData();

  
  const filterRef = useRef(null);


    useEffect(() => {
    if (!filterRef.current) return; // prevent null crash
    if (openFilter) {
      filterRef.current.classList.remove("hidden");
      filterRef.current.classList.add("block");
    } else {
      filterRef.current.classList.remove("block");
      filterRef.current.classList.add("hidden");
    }
  }, [openFilter]);

  return (
    <div
      className=" bg-gray-100 mt-5 p-4 rounded-md h-max hidden md:block"
      ref={filterRef}
    >
      <input
        type="text"
        value={search}
        placeholder="Search"
        className=" bg-white p-2 rounded-md border-gray-400 border-2"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {/* category only data */}
      <h1 className=" mt-5 font-semibold text-xl">Category</h1>

      <div className="flex flex-col gap-2 mt-3">
        {categories?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                id={item}
                checked={categoryFilter === item}
                value={item}
                onChange={handleCategoryChange}
              />
              <label className="cursor-pointer uppercase" htmlFor={item}>
                {item}
              </label>
            </div>
          );
        })}
      </div>

      {/* brand only data */}

      <h1 className=" mt-5 font-semibold text-xl mb-3">Brand</h1>

      <select
        name=""
        id=""
        className=" bg-white w-full p-2 rounded-md"
        value={brand}
        onChange={handleBrandChange}
      >
        <option value="" disabled>
          Select
        </option>

        {uniqueBrand
          ?.filter((items) => {
            return items && items.length > 1;
          })
          .map((item, index) => {
            return (
              <option value={item} key={index}>
                {item.toUpperCase()}
              </option>
            );
          })}
      </select>
      {/* price range */}

      <h1 className=" mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          Price Range: ${0} - ${priceRange[1]}
        </label>

        <input
          type="range"
          min={0}
          max={50000}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>
      <button
        className=" bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
        onClick={() => {
          setSearch("All");
          setCategoryFilter("All");
          setBrand("All");
          setPriceRange([0, 1500]);
        }}
      >
        Reset filter
      </button>
    </div>
  );
};

export default React.memo(FilterSection);
