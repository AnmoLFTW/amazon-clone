import { buffer } from "micro";
import * as admin from "firebase-admin";
const serviceAccount = require("../../../serviceAccount.json");
const fulfillOrder = async (session) => {
  //FULLFILLING ORDER

  return app.firestore()
  .collection("users")
  .doc(session.metadata.email)
  .collection("orders").doc(session.id).set({
    amount:session.amount_total/100,
    amount_shipping:session.total_details.amount_shipping/100,
    images:JSON.parse(session.metadata.images),
    timestamp:admin.firestore.FieldValue.serverTimestamp()
  })
  .then(()=>{console.log("success")})
  .catch(()=>{console.log("failure")})
};
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//Establish connection to stripe

const stripe = require("stripe")(
  "sk_test_51KoYjUSDZBjXIg74HFVs8kS7SMB0v1K8pbA6TCU7meJtTx9NQslculaw8oyBx1xR6r6CBRxQQC0qKJ91xR9eCTXk00B0MFg0qZ"
);
const endpointSecret =
  "whsec_5d9bd255b26736ad20521f0b17dadf3115c3138382a5abda7b4e0807cc6ab1d5";
export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    //verify that event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(`WEBHOOK ERR: ${err.message}`);
      return res.status(400).send(`WEBHOOK ERR: ${err.message}`);
    }

    //FOR LEGIT EVENT
    //HANDLE CHECKOUT SESSION COMPLETED EVENT

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fulfillOrder(session).then(()=>{res.status(200)})
      .catch((err)=>{res.status(400).send('Webhook Error')})
    }
  }
};

//If you don't want things to do in next.js way
export const config={
    api:{
        bodyParser:false,
        externalResolver:true
    }
}