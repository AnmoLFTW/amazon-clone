import axios from 'axios'

const stripe=require('stripe')('sk_test_51KoYjUSDZBjXIg74HFVs8kS7SMB0v1K8pbA6TCU7meJtTx9NQslculaw8oyBx1xR6r6CBRxQQC0qKJ91xR9eCTXk00B0MFg0qZ')

export default async(req, res) =>{
    const {items,email}=req.body;
    const transformedItems=items.map(item=>({
        description:item.description,
        quantity:1,
        price_data:{
            currency:'gbp',
            unit_amount:item.price*100,
            product_data:{
                name:item.title,
                images:[item.image]
            }
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        shipping_address_collection:{allowed_countries:['GB','US','CA','IN']},
        line_items:transformedItems,
        mode:'payment',
        success_url:'http://localhost:3000/success',
        cancel_url:'http://localhost:3000/checkout',
        metadata:{
            email,
            images: JSON.stringify(items.map(item=>item.image)),
            Itemid: JSON.stringify(items.map(item=>item.id))

        }
    })

    res.status(200).send({
        id:session.id
    })
}