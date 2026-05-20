// import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log("inputVal", inputVal);
          let currentDate = new Date();
          // currentDate.getTime()
          let obj = {
            id: currentDate.getTime(),
            todo: inputVal,
          };

          let previous = [...todos];

          previous.push(obj);

          setTodos(previous);
        }}
      >
        <input
          type="text"
          onChange={(event) => {
            setInputVal(event.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>

      {/* /// [{id: 234234234, todo: "Abc"}, {id: 234234235, todo: "Abc"}] */}

      {todos.map((eachTodo) => {
        return (
          <div
            key={eachTodo.id}
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <p>{eachTodo.todo}</p>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
