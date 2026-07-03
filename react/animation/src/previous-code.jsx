import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

function App() {

  // const [animationPixel, setAnimationPixel] = useState(0)

  // const animationContainer = useRef();
  // const animationInput = useRef()

  gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 
  gsap.registerPlugin(ScrollTrigger);

  // useGSAP(() => {
  //   // gsap.to(".box", { x: 800, duration: 2, repeat: -1, yoyo: true, delay: 1, backgroundColor: "blue" })
  //   const tl = gsap.timeline();
  //   tl.from("h1", { y: -50, duration: 1, opacity: 0, delay: 1, stagger: 0.5 })
  //   tl.to("h1", { y: 50, duration: 1, opacity: 0, delay: 1, stagger: 0.5 })
  //   // gsap.to(".box", { x: animationPixel, duration: 2 })
  // })

  // useGSAP(() => {
  //   // gsap.to("#box1", { x: 400, duration: 2, delay: 1 })
  //   // gsap.to("#box2", { x: 400, duration: 1, delay: 3 })
  //   // gsap.to("#box3", { x: 400, duration: 1, delay: 4 })
  //   const tl = gsap.timeline();
  //   tl.to("#box1", { x: 400, duration: 2, delay: 1 })
  //   tl.to("#box2", { x: 400, duration: 2 })
  //   tl.to("#box3", { x: 400, duration: 2 })
  // })

  useGSAP(() => {
    gsap.from(
      "#sec1 .box",
      { scale: 0.3, opacity: 0, rotate: 360, duration: 2, delay: 1 }
    )
    gsap.from(
      "#sec2 .box",
      {
        scale: 0.3,
        opacity: 0,
        rotate: 360,
        // duration: 2,
        scrollTrigger: {
          trigger: "#sec2 .box",
          start: "top 70%",
          end: "top 40%",
          scrub: 2,
          // markers: true
        }
      }
    )
    gsap.from(
      "#sec3 .box",
      { scale: 0.3, opacity: 0, rotate: 360, duration: 2, delay: 1 }
    )
  })


  return (
    <div className="">

      {/* <div className="box" id='box1'></div>
      <div className="box" id='box2'></div>
      <div className="box" id='box3'></div> */}

      {/* <label htmlFor="">
        <input type="number" ref={animationInput} />
      </label>
      <button onClick={() => { setAnimationPixel(animationInput.current.value) }}>Animate</button>

      <div className="upparSec" ref={animationContainer}>
        <div className="box"></div>
      </div>
      <br />
      <br /> */}

      {/* <div className="lowerSec">
        <div className="box"></div>
      </div> */}

      {/* <div className="skills">
        <h1>HTML</h1>
        <h1>CSS</h1>
        <h1>JAVASCRIPT</h1>
        <h1>REACT</h1>
      </div> */}
      <section id='sec1'>
        {/* <h1>Section 1</h1> */}
        <div className="box"></div>
      </section>

      <section id='sec2'>
        {/* <h1>Section 2</h1> */}
        <div className="box"></div>
      </section>

      <section id='sec3'>
        {/* <h1>Section 3</h1> */}
        <div className="box"></div>
      </section>

    </div>
  );
}

export default App;
