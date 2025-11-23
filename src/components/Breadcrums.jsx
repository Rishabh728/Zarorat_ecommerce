import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrums = ({ product_name }) => {
    console.log(product_name)
    const navigate = useNavigate()
  return (
      <div className=' max-w-6xl mx-auto my-10'>
          <h1 className=' text-xl text-gray-700 font-semibold '>
              <span className=' cursor-pointer' onClick={() => {
                  navigate('/')
              }}>
                  Home
              </span>/ <span className=' cursor-pointer' onClick={() => {
                  navigate('/products')
              }}>Products</span> / <span>{product_name }</span>
              
          </h1>
    </div>
  )
}

export default Breadcrums