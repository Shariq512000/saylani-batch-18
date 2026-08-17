// import logo from './logo.svg';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import './App.css';

function App() {

  const baseUrl = "https://ecom-test-backend.vercel.app" //http://localhost:5000

  const [allProducts, setAllProducts] = useState([])

  const getAllProducts = async () => {
    try {
      const apiRes = await axios.get(`${baseUrl}/get-all-products`);
      // console.log("apiRes", apiRes.data)
      setAllProducts(apiRes.data.products)
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const formik = useFormik({
    initialValues: {
      productImage: '',
      title: '',
      price: 0,
      description: '',
    },
    onSubmit: async (values) => {
      // console.log(values)
      try {
        await axios.post(`${baseUrl}/add-product`, {
          title: values.title,
          price: values.price,
          description: values.description,
          image: values.productImage
        })
        // console.log("apiRes", apiRes.data)
        getAllProducts()
      } catch (error) {
        console.log("Err", error)
      }
    }
  })

  return (
    <div className="App">

      <form onSubmit={formik.handleSubmit}>
        <label>
          Image Url: <input type="url" placeholder="https://example/1.png" name="productImage" onChange={formik.handleChange} value={formik.values.productImage} />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            placeholder="Mobile"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </label>
        <br />
        <label>
          price:
          <input
            type="number"
            placeholder="5000"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <div>
        {allProducts.map((eachProduct) =>
          <div key={eachProduct.id}>
            <h1>Title: {eachProduct.title}</h1>
            <h4>{eachProduct.price}</h4>
            <p>{eachProduct.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
