import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Home.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const hero = useRef();
    const features = useRef();
    const about = useRef();


    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".title", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        })
            .from(".subtitle",
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                }
            )
            .from(
                ".btn",
                {
                    scale: 0,
                    duration: 0.5,
                    ease: "back.out(2)",
                }
            );

        gsap.from(".card", {
            scrollTrigger: {
                trigger: features.current,
                start: "top 75%",
                // scrub: 2,
                markers: true
            },
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
        });

        gsap.from(".about-text", {
            scrollTrigger: {
                trigger: about.current,
                start: "top 70%",
            },
            x: -100,
            opacity: 0,
            duration: 1,
        });

        gsap.from(".about-img", {
            scrollTrigger: {
                trigger: about.current,
                start: "top 70%",
            },
            x: 100,
            opacity: 0,
            duration: 1,
        });
    }, {});

    return (
        <div className="home">
            {/* Hero */}
            <section className="hero" ref={hero}>
                <h1 className="title">Build Amazing Experiences</h1>

                <p className="subtitle">
                    React + GSAP ScrollTrigger animations with a beautiful landing page.
                </p>

                <button className="btn">Get Started</button>
            </section>

            {/* Features */}
            <section className="features" id="features" ref={features}>
                <h2>Features</h2>

                <div className="cards">
                    <div className="card">
                        <h3>Fast</h3>
                        <p>Lightning fast animations powered by GSAP.</p>
                    </div>

                    <div className="card">
                        <h3>Responsive</h3>
                        <p>Looks amazing on every device.</p>
                    </div>

                    <div className="card">
                        <h3>Modern</h3>
                        <p>Clean UI with premium animations.</p>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="about" ref={about}>
                <div className="about-text">
                    <h2>Why GSAP?</h2>

                    <p>
                        GSAP is the most powerful animation library for the web. Combine it
                        with React and ScrollTrigger to create immersive user experiences.
                    </p>
                </div>

                <div className="about-img">
                    🚀
                </div>
            </section>
        </div>
    );
}