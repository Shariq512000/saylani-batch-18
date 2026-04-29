import { useState } from 'react';
import './App.css';

function App() {

  const [todo, setTodo] = useState("");
  const [time, setTime] = useState("");
  const [todoList, setTodoList] = useState([]);

  return (
    <div className="App">
      <form onSubmit={(e) => {
        e.preventDefault();
        let obj = {
          work: todo,
          time: time
        }
        setTodoList([...todoList, obj])
        setTodo("")
        setTime("")
      }}>

        <input type="text" value={todo} placeholder='Enter Your Work' onChange={
          (event) => {setTodo(event.target.value)}
        } />

        <br />

        <input type="time" value={time} onChange={
          (event) => {setTime(event.target.value)}
        } />

        <br />

        <button type='submit'>Add Work</button>
      </form>

      {todoList.map((eachTodo, index) => {
        return(
          <div className="" key={index}>
            <h1>{eachTodo.work}</h1>
            <p>{eachTodo.time}</p>
          </div>
        )
      })}

    </div>
  );
}

export default App;
