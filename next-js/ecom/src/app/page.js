import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getProducts } from "../api-endpoints";

export default async function Home() {
  const data = await getProducts();
  console.log("data", data)
  return (
    <div>
      <h1>Hello World</h1>
      {
        data?.products.map((eachProduct) => {
          return (
            <ProductCard key={eachProduct.id} data={eachProduct} />
          )
        })
      }
      {/* <Link href={"/about"}>Go To About Page</Link> */}
    </div>
  );
}
