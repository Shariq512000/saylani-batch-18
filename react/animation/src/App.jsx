import './App.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Home from './Home';
import PreviousCode from './previous-code';

function App() {

  // gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 
  // gsap.registerPlugin(ScrollTrigger);

  // useGSAP(() => {
  //   gsap.to(
  //     "#sec2 h1",
  //     {
  //       x: -900,
  //       duration: 2,
  //       scrollTrigger: {
  //         trigger: "#sec2",
  //         start: "top 0%",
  //         end: "top -150%",
  //         scrub: 2,
  //         markers: true,
  //         pin: true,
  //         // snap: {
  //         //   snapTo: "labels", // snap to the closest label in the timeline
  //         //   duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
  //         //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
  //         //   ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
  //         // },
  //       }
  //     }
  //   )
  // })


  return (
    // <div className="">
    //   <section>

    //   </section>

    //   <section id='sec2'>
    //     <h1>Experiences</h1>
    //   </section>

    //   <section id='sec3'></section>
    // </div>
    // <Home />
    <PreviousCode />
  );
}

export default App;
