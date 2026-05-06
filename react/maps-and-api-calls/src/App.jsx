import { useEffect, useState } from 'react';
import axios from "axios";
import "./App.css"
import ProductCard from './component/ProductCard';
import Card from './component/card';

function App() {

  const [products, setProducts] = useState([]);

  const getApiData = async() => {
    try {
      const apiRes = await axios.get("https://dummyjson.com/products"); // intezaar krta hai response aane ka
      setProducts(apiRes.data.products)
    } catch (error) {
      console.log("Err", error)
    }
  }

  useEffect(() => {
    getApiData()
  }, [])

  // console.log("Test")

  // const test = () => {

  //   console.log("Run Function")
  // }

  // useEffect(() => {
  //   test()
  // } , [])


  return (
    <div className="App">
      {products.map((eachProduct) => {
        // console.log(eachProduct)
        return(
          <Card key={eachProduct.id} product={eachProduct} />
        )
      })}
    </div>
  );
}

export default App;


// Mount
// Update
// Unmount