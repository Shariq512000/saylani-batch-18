import logo from './logo.svg';
import './App.css';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useRef } from 'react';

function App() {

  const container = useRef();

  gsap.registerPlugin(useGSAP);
  // useGSAP(() => {
  //   // agar to lagaraha hoon to initial se final pe jaega
  //   // agar from lagaraha hoon to final se initial pe aega
  //   gsap.to('#box1', { x: 200, duration: 1, delay:3 });
  //   gsap.to('#box2', { x: 400, duration: 1, delay:4 });
  //   gsap.to('#box3', { x: 600, duration: 1, delay:5 });
  //   gsap.to('#box4', { x: 800, duration: 1, delay:6 });
  // })
  useGSAP(() => {
    // gsap.from(".contentSection", {x: -930, opacity: 0.1})
    // gsap.from(".imageSection", {x: 550, opacity: 0.1})
    // gsap.to(".box", {
    //   x: 800,
    //   duration: 3,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "sine.inOut"
    // });

    let tl = gsap.timeline({
      defaults:{
        duration: 2
      }
    });
    tl.to("#box1", { x: "+1062", delay: 2 })
      .to("#box2", { x: 1062 })
      .to("#box3", { x: 1062 })

      setTimeout(() => {
        tl.reverse()
      }, 10000)
  }, { scope: container })

  return (
    <div className="" ref={container}>
      <div id="box1" className='box'></div>
      <div id="box2" className='box'></div>
      <div id="box3" className='box'></div>
      <div id="box4" className='box'></div>

      {/* <div className="banner">
        <div className="contentSection">
          <h1>Test Heading</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt explicabo inventore saepe ullam eveniet odit dolorem quas minus qui neque officia eius veniam quisquam, dolore illo pariatur quasi eaque dignissimos.</p>
          <ul>
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
            <li>Service 4</li>
            <li>Service 5</li>
          </ul>
          <div className="btnGroup">
            <button>Get Started</button>
            <button>Contact Us</button>
          </div>
        </div>
        <div className="imageSection">
          <div className="img"></div>
        </div>
      </div> */}
      {/* <div className="card"></div> */}
      {/* <div className="box"></div> */}
    </div>
  );
}

export default App;
