import Head from "next/head";
import Header from "../Components/Header"
import Banner from "../Components/Banner";
import ProductFeed from "../Components/ProductFeed"
export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* ---- TO BEGIN, delete this section and GET CODING!!! ---- */}
      <Header/>
      {/* ----Banner ---- */}
      <main className="max-w-screen-2xl mx-auto">
      <Banner></Banner>
      <ProductFeed products={products}></ProductFeed>
      </main>
    </div>
  );
}
//Not a static page calculate this on server first and then render the entire page
export async function getServerSideProps(context){
const products= await fetch('https://fakestoreapi.com/products')
.then((res)=>res.json());

return{
  props:{
    products: products
  }
}
}
