import { useState } from "react";
import Extra from "./components/Extra";
import Test from "./components/Test";

function App() {
  // let num = 1;
  // const increment = () => {
  //   num++;
  //   console.log(num);
  // };
  // const decrement = () => {
  //   num--;
  //   console.log(num);
  // };
  // return (
  //   <div className="App">
  //     <button onClick={decrement}>Decrement</button>
  //     <h1>{num}</h1>
  //     <button onClick={increment}>Increment</button>
  //   </div>
  // );
  // const [num, setNum] = useState(Number(localStorage.getItem("MyNumber")));
  // const [num, setNum] = useState(1);
  // const increment = () => {
  //   setNum(num + 1);
  // };
  // const decrement = () => {
  //   setNum(num - 1);
  // };
  // // // localStorage.setItem("MyNumber", num)
  // return (
  //   <div className="App">
  //     <button onClick={decrement}>Decrement</button>
  //     <h1>{num}</h1>
  //     <button onClick={increment}>Increment</button>
  //   </div>
  // );
  const [isShow, setShow] = useState(false); // true

  return (
    <div className="">
      <h1>Main Component</h1>

      {/* {isShow ? <Test /> : null}

      <button
        onClick={() => {
          setShow(!isShow);
        }}
      >
        {" "}
        {isShow ? "Hide" : "Show"}{" "}
      </button> */}

      <Extra />
    </div>
  );
}

export default App;

// Mount
// Update // state ya props update
// Unmount
