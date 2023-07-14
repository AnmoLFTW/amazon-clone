// WE USE SSR TO FETCH PRODUCTS FROM FAKE STORE API
import Product from './Product'
import React, { useState } from "react";
import { StarIcon } from '@heroicons/react/24/outline';
const ProductFeed = ({ products }) => {

  return (
    <div className="bg-gray-100 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">

     
      {products.slice(0,4).map(({id,title,price,description,category,image})=>{
        
        return <Product key={id} id={id} title={title} description={description} category={category} image={image} price={price}/>
        
      })}
      <img className="md:col-span-full mx-auto"
      src="https://links.papareact.com/dyz" alt=""></img>
      <div className="md:col-span-2 mx-auto">
      {products.slice(4,5).map(({id,title,price,description,category,image})=>{
        
        return <Product key={id} id={id} title={title} description={description} category={category} image={image} price={price}/>
        
      })}</div>
      {products.slice(5,16).map(({id,title,price,description,category,image})=>{
        
        return <Product key={id} id={id} title={title} description={description} category={category} image={image} price={price}/>
        
      })}
    </div>
  );
};

export default ProductFeed;
