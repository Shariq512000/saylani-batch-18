import './App.css';
import UserCard from "./components/card"

function App() {
  return (
    <div className='app'>
      <div className='wrapper'>
        <UserCard name="Test" batch="18" course="Web & App Development" />
        <UserCard name="Test2" batch="17" course="Web & App Development" />
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