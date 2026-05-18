import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./component/card";

function App() {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); //

  // get, post, put, patch, delete

  const getApiData = useCallback(async () => {
    // https://dummyjson.com/products/category/smartphones
    try {
      const apiRes = await axios.get(
        `https://dummyjson.com/products${
          selectedCategory ? `/category/${selectedCategory}` : ""
        }`
      ); // intezaar krta hai response aane ka
      console.log(apiRes.data);
      setProducts(apiRes.data.products);
    } catch (error) {
      console.log("Err", error);
    }
  }, [selectedCategory]);

  const getCategories = async () => {
    try {
      const catData = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      setCategoryList(catData.data);
    } catch (error) {
      console.log("Err", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, [selectedCategory, getApiData]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="App">
      <div className="filterBar">
        <h6>Search By Category</h6>
        <select
          value={selectedCategory} //""
          onChange={(event) => {
            /// jb bhi kisi input, textarea, select wagaira ki value user change krta hai to onChange ka event perform hota hai
            /// jb bhi koi event perform hota hai to uske function mai mujhe event ki saari details (event ka object) milta hai, aur jis element k uppar event perform hua hai usko get krne k liye (event.target) likhna prta hai, aur uske andar se value get krne k liye event.target.value
            /// selected value get krke state k andar set krwa raha hoon aur uppar useEffect k depandency array k andar is state ko define kia hua hai matlab jb bhi ye state change hoga useEffect dubara chalega
            setSelectedCategory(event.target.value);
          }}
        >
          <option value="">All</option>

          {/* <option value="men-shirt">men-shirt</option>
          <option value="phone">phone</option>
          <option value="laptop">laptop</option>
          <option value="home-decoration">home-decoration</option> */}

          {categoryList.map((eachCategory) => {
            return (
              <option key={eachCategory} value={eachCategory}>
                {eachCategory}
              </option>
            );
          })}
        </select>

        {/* <button
          onClick={() => {
            setSelectedCategory("");
          }}
        >
          Clear Filter
        </button> */}
      </div>
      {products.map((eachProduct) => {
        return <Card key={eachProduct.id} product={eachProduct} />;
      })}
    </div>
  );
}

export default App;

// Mount
// Update
// Unmount
