import { useState } from "react";
import "./App.css";
import UserCard from "./components/card";

function App() {
  const [students, setStudents] = useState([
    { name: "Test", batch: "18", course: "Web & App Development" },
    { name: "Test2", batch: "17", course: "Web & App Development" },
    { name: "Test3", batch: "17", course: "Web & App Development" },
    { name: "Test4", batch: "18", course: "Web & App Development" },
    { name: "Test5", batch: "18", course: "Web & App Development" },
    { name: "Test6", batch: "17", course: "Web & App Development" },
  ]);

  return (
    <div className="app">
      <div className="wrapper">
        {/* {students.map((student, i) => {
          return(
            <UserCard key={i} name={student.name} batch={student.batch} course={student.course} />
          )
        })} */}

        <UserCard name="Test" batch="18" course="Web & App Development" />
        {/* <div className="card">
          <h4>Name: {"Test"}</h4>
          <h6>Batch: {"18"}</h6>
          <p>Course: {"Web & App Development"}</p>
        </div>
        props ={
          name: "Test",
          batch: "18",
          course: "Web & App Development"
        } */}
        <UserCard name="Test2" batch="17" course="Web & App Development" />
        {/* props ={
          name: "Test2",
          batch: "17",
          course: "Web & App Development"
        }
        <div className="card">
          <h4>Name: {"Test2"}</h4>
          <h6>Batch: {"17"}</h6>
          <p>Course: {"Web & App Development"}</p>
        </div> */}

        <UserCard name="Test3" batch="17" course="Web & App Development" />
        <UserCard name="Test4" batch="17" course="Web & App Development" />
        <UserCard name="Test5" batch="17" course="Web & App Development" />
        <UserCard name="Test6" batch="17" course="Web & App Development" />
        <UserCard name="Test7" batch="17" course="Web & App Development" />
      </div>
    </div>
  );
}

export default App;

// function test(para, secondPara){

// }

// test(123, 456)
