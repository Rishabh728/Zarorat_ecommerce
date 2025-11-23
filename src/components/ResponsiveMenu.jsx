import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();
    return (
        <>
      
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between px-8 pb-6 pt-12 text-white md:hidden rounded-r-xl shadow-md transition-all duration-400  bg-gray-500`}
      >
              <button onClick={()=>setOpenNav(false)} className=" bg-gray-600  absolute top-3 hover:bg-gray-700 text-center  h-12 w-12 rounded-full text-2xl right-3 text-red-100 z-30 transition-all duration-300 font-light"  >X</button>
          
          <div className="">
        <div className=" flex items-center justify-start gap-3 ">
          {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}
          <div>
            <h1 className=" text-lg"> Hello, {user ? user.firstName : "User"}</h1>
            <h1 className=" text-sm text-white"> Premium User</h1>
          </div> 
        </div>
        <nav className=" mt-12 hover:text-gray-50">
          <ul className=" flex flex-col gap-7 text-2xl font-semibold ">
            <Link
                          to={"/"}
                          onClick={()=>setOpenNav(false)}
              className={ " text-red-100 cursor-pointer" }
            >
              <li>Home</li>
            </Link>
            <Link
              to={"/products"}
               onClick={()=>setOpenNav(false)}
              className={ " text-red-100 cursor-pointer" }
            >
              <li>Products</li>
            </Link>
            <Link
              to={"/about"}
               onClick={()=>setOpenNav(false)}
              className={ " text-red-100 cursor-pointer" }
            >
              <li>About</li>
            </Link>
            <Link
              to={"/contact"}
               onClick={()=>setOpenNav(false)}
              className={ " text-red-100 cursor-pointer" }
            >
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>
            </div>
            </>
  );
};

export default React.memo(ResponsiveMenu);
