import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import {addToBasket, removeFromBasket} from '../slices/basketSlice';
const CheckoutProduct = ({id,title,price,description,category,image}) => {
    const dispatch=useDispatch();
    const addItemToBasket=()=>{
        const product={id,title,price,description,category,image}
        dispatch(addToBasket(product))
    }
    const removeItemFromBasket=()=>{
        //Remove the item from redux
        dispatch(removeFromBasket({id}))
    }
    return (
    <div className="grid grid-cols-5">
        <Image src={image} alt="" width={200} height={200} objectFit="contain"/>
        <div className="col-span-3 mx-5">
          <p className='md:text-xl font-medium text-sm'>{title}</p>
          <div>
            <p className="hidden md:block md:line-clamp-3 md:text-xl text-xxs">{description}</p>
          </div>
          <p className="py-2 md:text-md text-xs font-medium">£{price}</p>
        </div>
          <div className="flex flex-col flex-wrap md:flex-nowrap justify-self-end justify-end space-y-2">
        <button className="button md:text-sm text-xs ml-16" onClick={addItemToBasket}>Add to Basket</button>
        <button className="button md:text-sm text-xs ml-16" onClick={removeItemFromBasket}>Remove to Basket</button>

        </div>

    </div>
  )
}

export default CheckoutProduct