import './App.css';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import RightBar from './components/RightBar';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='inner-content'>
        <Aside />
        <Main />
        <RightBar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
