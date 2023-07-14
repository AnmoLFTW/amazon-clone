import React from 'react'
import { useSession,getSession } from "next-auth/react"
import Header from '../Components/Header'
import db from '../../firebase'
import Order from '../Components/Order'
const orders = ({orders}) => {
    const { data: session } = useSession()
  return (
    <div>
        <Header />
        <main className="max-w-screen-lg mx-auto p-10">
            <h1 className="text-3xl font-bold border-b  mb-2 pb-1 border-yellow-400">
                Your Orders
            </h1>
            {session?(<h2>{orders.length} Orders</h2>):(<h2>Sign In to see orders</h2>)}
        <div className="mt-5 space-y-6">
            {orders?orders.map(order=>{ return <Order id={order.id} images={order.images} items={order.items} amount={order.amount}/>}):<p></p>}
        </div>
        </main>
    </div>
  )
}

export default orders;

export async function getServerSideProps(context){
    //anything here is node js 
    const stripe=require('stripe')('sk_test_51KoYjUSDZBjXIg74HFVs8kS7SMB0v1K8pbA6TCU7meJtTx9NQslculaw8oyBx1xR6r6CBRxQQC0qKJ91xR9eCTXk00B0MFg0qZ')
    const session=await getSession(context);
    if(!session){
        return{
            props:{},
        }
    }
    const stripeOrders=await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp','desc').get();
    const userOrders= await Promise.all(stripeOrders
        .docs.map(async(order)=>({id:order.id, 
        amount:order.data().amount,
        images:order.data().images,
        items:(await stripe.checkout.sessions.listLineItems(order.id,{
            limit:100,
        })
        ).data,    
    })));

    console.log(userOrders)

    return{
        props:{
            orders:userOrders
        }
    }

}


