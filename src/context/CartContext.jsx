import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';

export const CartContext = createContext(null)

export const CartProvider = ({children})=> {
    const [cartItem, setCartItem] = useState([]);


    const addToCart = (product) => {
        const itemInCart = cartItem.find((item) => item.pid === product.pid)
        
        if (itemInCart) {
            // increase quantity if already in cart 
            const updateCart = cartItem.map((item) => item.pid === product.pid ? { ...item, quantity: item.quantity + 1 } : item);
            setCartItem(updateCart)
            toast.success('Product  Quantity increased')
        }
        else {
            //Add new item qty

            setCartItem([...cartItem, { ...product, quantity: 1 }])
            toast.success('Product is added to cart')
            
        }
    }

    const updateQuantity = ( productId, action) => {
        setCartItem(
            cartItem.map((item) => {
            if(item.pid === productId){
                let newUnit = item.quantity;
                if (action === 'increase') {
                    newUnit += 1;
                    toast.success('Quantity is increased')

                }
                else if(action === 'decrease'){
                    newUnit -= 1;
                    toast.success('Quantity is decreased')
                }
                return newUnit>0?{...item, quantity: newUnit, }:null
            }
            return item;
        }).filter((item)=>item!=null) // remove qty item 0
        )
    }

    // delete item
    const deleteItem = (productId) => {
        setCartItem(cartItem.filter((item) => item.pid !== productId))
        toast.success('Item deleted successfully')
        
    }


    // console.log(cartItem)
    return <CartContext.Provider value={{cartItem, setCartItem, addToCart,updateQuantity,deleteItem}}>
    {children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext)