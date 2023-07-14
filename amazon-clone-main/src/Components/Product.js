import React,{useState} from 'react'
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
const Product = ({id,title,price,description,category,image}) => {
  const dispatch =useDispatch()  
  const MAX_RATE=5;
    const MIN_RATE=1;
    const rate=Math.floor(Math.random()*(MAX_RATE-MIN_RATE+1))+MIN_RATE
    const [rating,setRating]=useState(rate);

    const addItemToBasket=()=>{
      const product={id,title,price,description,category,image};
      dispatch(addToBasket(product))
    }

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
     
    <p className='absolute top-2 right-2 text-sm text-gray-400'>{category}</p>
    <Image src={image} height={200} width={200} className='flex items-center justify-center'/>
    <h1 className='text-xm font-medium mt-2'>{title}</h1> 
    <p className='text-sm my-2 line-clamp-2'>{description}</p>
    <div>
    <p>£{price}</p>
    </div>
    <button className='mt-auto button' onClick={addItemToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product