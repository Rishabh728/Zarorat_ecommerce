import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { toast } from 'react-toastify';
import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import emptyCart from '../assets/emptyCart.png'
import Payment from '../components/Payment'
import { signUp } from "../components/Navbar";


export let navigateTo = (navigate) => {
  console.log("The Navigate Function is getting Triggered");
  return navigate('/payment')
}
const Cart = ({location, getLocation}) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  
  let nnavigate = useNavigate()
  

  const { user } = useUser()
  // const user  = useUser()
  console.log(user);

const navigate = useNavigate()

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.retail_price,
    0
  );

  return (
    <div className=" mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className=" font-bold text-2xl">My Cart ({cartItem.length})</h1>
          <div>
            <div className=" mt-10">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                  >
                    <div className=" flex items-center gap-4">
                      <img
                        src={JSON.parse(item.image)[0]}
                        alt={item.product_name}
                        className=" w-20 h-20 rounded-md"
                      />
                      <div>
                        <h1 className=" md:w-[300px] line-clamp-2">
                          {item.product_name}
                        </h1>
                        <p className=" text-red-500 font-semibold text-lg">
                          {item.retail_price}
                        </p>
                      </div>
                    </div>
                    <div className=" bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl ">
                      <button className=" cursor-pointer" onClick={()=>updateQuantity( item.pid, 'decrease')}>-</button>
                      <span>{ item.quantity}</span>
                      <button className=" cursor-pointer" onClick={()=>updateQuantity( item.pid, 'increase')}>+</button>
                    </div>
                    <span className=" hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl">
                      <FaRegTrashAlt className=" text-red-500  text-2xl cursor-pointer " onClick={()=>deleteItem(item.pid)}/>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-8">
              <div className=" bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className=" text-gray-800 font-bold text-xl ">
                  Delivery Info
                </h1>
                <div className=" flex flex-col space-y-1">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name" value={user?user.fullName:''}
                    className=" p-2 rounded-md"
                  />
                </div>
                <div className=" flex flex-col space-y-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text" disabled
                    placeholder="Enter your address"
                    className=" p-2 rounded-md"
                    value={location?.county}
                  />
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor=""> State</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      name=""
                      id=""
                      className=" p-2 rounded-md w-full "
                      value={location?.state}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor=""> Post code</label>
                    <input
                      type="text"
                      placeholder="Enter your Post code "
                      name=""
                      id=""
                      className=" p-2 rounded-md w-full "
                      value={location?.postcode}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor=""> Country</label>
                    <input
                      type="text"
                      placeholder="Enter your country "
                      name=""
                      id=""
                      className=" p-2 rounded-md w-full "
                      value={location?.country}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor=""> Phone No</label>
                    <input
                      type="text"
                      placeholder="Enter your Phone number "
                      name=""
                      id=""
                      className=" p-2 rounded-md w-full "
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className=" bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer "
                >
                  submit
                </button>
                <div className=" flex items-center justify-center w-full text-gray-700 ">
                  ------OR------
                </div>
                <div className=" flex justify-center">
                  <button className=" bg-red-500 text-white px-3 py-2 rounded-md" onClick={getLocation}>
                    Detect Location
                  </button>
                </div>
              </div>
              <div className=" bg-white border-green-100 shadow-xl rounded-md p-7 md:mt-4 mt-0 space-y-2 h-max ">
                <h1 className=" text-gray-800 font-bold text-xl">
                  Bill details
                </h1>
                <div className=" flex justify-between items-center ">
                  <h1 className=" flex gap-1 items-center text-gray-700">
                    <span>
                      {" "}
                      <LuNotebookText />{" "}
                    </span>
                    Items total
                  </h1>
                  <p>${totalPrice}</p>
                </div>
                <div className=" flex justify-between items-center">
                  <h1 className=" flex gap-1 items-center text-gray-700">
                    <span>
                      {" "}
                      <MdOutlineDeliveryDining />{" "}
                    </span>
                    Delivery Charge
                  </h1>
                  <p className=" text-red-500 font-semibold ">
                    <span className=" text-gray-600 line-through ">$25 </span>{" "}
                    FREE
                  </p>
                </div>
                <div className=" flex justify-between items-center">
                  <h1 className=" flex gap-1 items-center text-gray-700">
                    <span>
                      {" "}
                      <GiShoppingBag />{" "}
                    </span>
                    Handling Charge
                  </h1>
                  <p className=" text-red-500 font-semibold ">$5</p>
                </div>
                <hr className=" text-gray-200 mt-2" />
                <div className=" flex justify-between items-center">
                  <h1 className=" font-semibold text-lg">Grand Total</h1>
                  <p className=" font-semibold text-lg">${totalPrice + 5}</p>
                </div>
              <div>
                <h1 className=" font-semibold text-gray-700 mb-3 mt-7">
                  Apply Promo Code
                </h1>
                <div className=" flex gap-3">
                  <input
                    type="text"
                    placeholder=" Enter Code"
                    className=" p-2 rounded-md w-full"
                  />
                  <button className=" bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                    Apply
                  </button>
                </div>
              </div>
                <button onClick={() => !!user ?
                  
                 navigateTo(nnavigate)
                  : toast.success('Required sign in ')
                } className=" bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to Checkout
              </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div className=" flex flex-col gap-3 justify-center items-center h-[600px] ">
            <h1 className=" text-red-500/80 font-bold text-5xl text-muted ">Oh no! Your Cart is Empty</h1>
            <img src={emptyCart} alt="" className=" w-[400px]" />
            <button onClick={()=>navigate('/products')} className=" bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer">Continue Shoping </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Cart);
