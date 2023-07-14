import React from 'react'
import Header from '../Components/Header'
import { useRouter } from 'next/router'
const success = () => {
    const router = useRouter()
  return (
    <div className='bg-gray-100 h-screen p-2'>
        <Header/>
        <main className='mx-auto max-w-screen-lg text-3xl'>
         <div className='flex justify-center space-y-6 flex-col bg-white p-10'>
            <h1 className="font-medium">Your Order Has Been Confirmed</h1>
            <p>Thanks You For Shopping With Amazon, Our Company hope that you buy more great stuff from Amazon</p>
            <button className="button " onClick={()=>router.push('/orders')}>View Orders</button>
         </div>
        </main>
    </div>
  )
}

export default success