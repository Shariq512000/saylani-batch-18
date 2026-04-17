import logo from './logo.svg';
import './App.css';
import UserCard from './components/card';

function App() {
  return (
    <div className='app'>
      <div className='wrapper'>
        <UserCard name="Owais" batch="18" course="Web & App Development" image="https://t3.ftcdn.net/jpg/04/60/91/88/360_F_460918802_XVCymFr7MoziFpnInbTDvrlblYhvAOi2.jpg" />
        <UserCard name="Test1" batch="17" course="Graphic" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Wc1t5zO4nQoX8O_oczVQVgdyrGlE_ESDng&s" />
        <UserCard name="Test2" batch="11" course="Ai & Data Science" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Wc1t5zO4nQoX8O_oczVQVgdyrGlE_ESDng&s" />
        <UserCard name="Test3" batch="14" course="Web & App Development" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Wc1t5zO4nQoX8O_oczVQVgdyrGlE_ESDng&s" />
      </div>
    </div>
  );
}

export default App;
