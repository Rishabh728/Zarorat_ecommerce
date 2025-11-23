import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct';
import CategoryProduct from './pages/CategoryProduct';
import { useCart } from "../src/context/CartContext";
import ProtectedRoute from './components/Payment'
import Payment from './components/Payment'





const App = () => {
  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const {cartItem, setCartItem} = useCart()


  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition( async pos => {
      
      const { latitude, longitude } = pos.coords
      // console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        // console.log(exactLocation)
        setLocation(exactLocation)
        setOpenDropdown(false)
      } catch (error) {
        // console.log(error);
      }
    })
  }
  useEffect(() => {
    getLocation()
  },[])

  // Load cart from local storage on initial render
  useEffect(() => {
    console.log(cartItem)
    const storedCart = localStorage.getItem('cartItem');
    
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  },[])

// save cart to local storage whenever it changes

  useEffect(() => {
  console.log(cartItem);
  
  cartItem.length!=0 && localStorage.setItem('cartItem', JSON.stringify(cartItem))
  
},[cartItem]);


  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={ setOpenDropdown} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category/' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<Cart location={location} getLocation={getLocation} />}></Route>
        <Route path='/Payment' element={<Payment/>} />
      </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export default React.memo(App);