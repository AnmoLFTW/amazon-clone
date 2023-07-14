import React,{useState} from "react";
import Header from "../Components/Header";
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { selectItems,selectTotal } from './../slices/basketSlice';
import CheckoutProduct from "../Components/CheckoutProduct";
import { useSession, signIn, signOut } from "next-auth/react"
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise=loadStripe("pk_test_51KoYjUSDZBjXIg74p1ZhgwnGtf79wx8WPouiopwt0qF3TGeKkyGjUbB8zZFtDcNS2dyajztffYhAUkk8NXbz9SBV00uupHjsbU");
const checkout = () => {
    const { data: session } = useSession()
  const items=useSelector(selectItems)
  const total=useSelector(selectTotal)
  const [cost,netCost]=useState('')
 const createCheckoutSession=async()=>{
    const stripe=await stripePromise;
    console.log('checkout called')
    //Call a backend to create a checkout session
    const checkoutSession=await axios.post('/api/checkoutSession',{items:items,email:session.user.email})
    //Redirect user/customer to Stripe Checkout
    const result=await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })
    if(result.error){alert(result.error.message)}
 }
  console.log(items)
  return (
    <div>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
            <Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit="contain" className=""></Image>
        
        <div className="flex flex-col p-5 space-y-10 bg-white">
        <h1 className="text-2xl pb-6 border-b">{items.length===0?'Your basket is empty':'Your Shopping Basket'}</h1>
        {
            items.map((item,i)=>{
                return <CheckoutProduct key={i} id={item.id} title={item.title} name={item.name} rating={item.rating} price={item.price} description={item.description} category={item.category} image={item.image}></CheckoutProduct>
            })
        }
        {/* Right add/remove buttons */}
        </div>
        </div>
        <div className={items.length>0?"bg-white text-black flex flex-col lg:p-24 p-10 shadow-md flex-grow text-center":"invisible"}>
        {items.length>0 ?(
            <div>
            <h2 className="font-bold text-lg p-1 whitespace-nowrap">Subtotal ({items.length} Items): £{total}</h2>
            <button className={session?`button mt-2`:`bg-gray-300 text-black lg:p-2 p-1 rounded-md w-full mt-2`} onClick={createCheckoutSession}>{!session?"Sign in to Checkout":"Checkout"}</button></div>
        ):(<p className="invisible"></p>)}
      </div>
      </main>
      {/*Right Side Component */}
     
    </div>
  );
};

export default checkout;
