import React, { useContext, useEffect } from "react";
import { DataContext, DataProvider, getData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  AiOutlineAlignLeft,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Category from "./Category";

const Carousel = () => {
  const { data, fetchAllProducts } = getData()
  // console.log(data);
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            backgroundColor: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
         
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            backgroundColor: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
          
          
        />
      </div>
    );
  };

  // react slick
  var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div >
      <Slider {...settings}>
        {data
          ?.filter((item) => {
            const category = JSON.parse(item.product_category_tree)[0];
            return category.includes("Clothing");
          })
          ?.slice(0, 7)
          ?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10 "
              >
                <div className="flex gap-10 justify-center h-[600px] items-center px-4 flex-col md:flex-row  md:my-0 my-1">
                  <div className=" space-y-3 md:space-y-6 ">
                    <h3 className="text-red-500 font-semibold font-sans text-sm">
                      Powering Your World with the Best in Electronics
                    </h3>
                    <h1 className=" text-xl md:text-4xl font-bold uppercase md:line-clamp-3 line-clamp-2 w-full md:w-[500px] text-white ">
                      {item.product_name}
                    </h1>
                    <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                      {item.description}
                    </p>
                    <button className=" bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2 ">
                      Shop Now
                    </button>
                  </div>
                  <div>
                    <img
                      src={JSON.parse(item.image)[0]}
                      alt={item.product_name}
                      className="rounded-full md:w-[500px] md:h-[500px] w-[300px] h-[300px]  hover:scale-105 transition-all shadow-2xl shadow-red-400 "
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>

      <Category />
    </div>
  );
};

export default Carousel;
