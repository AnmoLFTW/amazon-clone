import React from 'react'

const Order = ({id,amount,items,images}) => {
  return (
    <div className='relative border-rounded-md'>
    <div className='flex md:flex-nowrap flex-wrap justify-center items-center md:space-x-10 lg:p-6 p-10 bg-gray-100 text-gray-600'>
    <div>
        <p className='font-bold text-xs'>ORDER PLACED</p>

    </div>
    <div className='text-center md:text-left p-2'>
    <p className='font-bold text-xs'>TOTAL</p>
    <p className='text-xs'>£{amount}</p></div>
    
    <p className='text-xs md:whitespace-nowrap sm:text-lg py-2 md:self-end md:flex-1 text-right text-blue-600'>{items.length}: Items</p>  
    <p className='absolute top-2 right-2 w-40 lg:w-72 md:text-xs text-xxs whitespace-nowrap truncate'>Order ID: {id}</p> 

    </div>
    <div className='flex space-x-6 overflow-x-auto py-6 shadow-md px-3'>
        {images.map(image =>{return <img src={image} className="h-20 sm:h-32 object-contain"></img>})}
        </div> 
    </div>
  )
}

export default Order