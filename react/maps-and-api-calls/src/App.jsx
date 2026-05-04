import { useEffect, useState } from 'react';
import axios from "axios";
import "App.css"

function App() {

  const [products, setProducts] = useState([])

  // Api Methods = Get, Post, Put, Patch, Delete

  const getData = async() => {
    try {
      const apiRes = await axios.get('https://dummyjson.com/products');
      setProducts(apiRes.data.products)
    } catch (error) {
      console.log("Err", error)
    }
  }

  useEffect(() => {
    getData()
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
      
    </div>
  );
}

export default App;


// Mount
// Update
// Unmount