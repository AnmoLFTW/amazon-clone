import React from 'react'
import Image from 'next/image'
import {MagnifyingGlassIcon,SearchIcon,ShoppingCartIcon} from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux'
import {selectItems} from '../slices/basketSlice'
const Header = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const items=useSelector(selectItems)
  return (
   <header>
    <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2  link">
    <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 link" onClick={()=>{router.push('/')}}>
    <Image src="https://links.papareact.com/f90" width={150} height={40}
     className='link object-contain px-6'
    /> 

    </div>    

    <div className="hidden items-center bg-yellow-400 h-10 rounded-md flex-grow md:flex link">
    <input type="text" className="p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none"/>
    <MagnifyingGlassIcon height={40} width={40} className="p-1"/>
    </div>


    <div className='text-white flex items-center space-x-6 mx-6 whitespace-nowrap text-xs md:text-sm relative'>
        <div className=""><p>{session?`Hello ${session.user.name}`:'Sign In Please'}</p>
        <button onClick={session?signOut:signIn} className="link">{session?`Sign Out`:`Sign In`}<p></p></button>
        </div>
        <div className="link" onClick={()=>{router.push('/orders')}}>
            <p>Returns</p>
            <p>& Orders</p>
        </div>
        <div className="relative link flex items-center" onClick={()=>{router.push('/checkout')}}>
            <span className="absolute bg-yellow-400 rounded-lg px-1 top-0 right-0 md:top-0 md:right-10 mb-3 ">{items.length}</span>
            <ShoppingCartIcon className='h-10 p-1 sm:p-0'/>
            <p className='hidden px-1 md:inline mt-5 font-bold text-md'>Basket</p>
        </div>

    </div>

    </div>

     {/*Bottom Nav*/}
    <div className='flex bg-amazon_blue-light text-white text-sm py-2 space-x-2 justify-center md:justify-start md:px-6'>
    <p className='link flex'>Prime Video</p>
    <p className='link flex'>Amazon Business</p>
    <p className='link flex'>Deals</p>
    <p className='link hidden lg:inline-flex'>Electronics</p>
    <p className='link hidden lg:inline-flex'>Clothes</p>
    <p className='link hidden lg:inline-flex'>Food & Grocery</p>
    
    

    <p ></p>
    </div>
   </header>
  )
}

export default Header