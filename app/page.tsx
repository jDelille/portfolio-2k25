"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "bottom bottom-=280",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(contentRef.current, {
            scaleX: 0.91,
            yPercent: -20,
            ease: "power2.out",
            duration: 0.5,
            borderBottomLeftRadius: "22px",
            borderBottomRightRadius: "22px",
          });
        },
        onLeaveBack: () => {
          gsap.to(contentRef.current, {
            scaleX: 1,
            yPercent: 0,
            ease: "power2.out",
            duration: 0.5,
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.content} ref={contentRef}>
        <h2>This is the content</h2>
        <div className={styles.test}></div>
      </div>

      <footer className={styles.footer}>

        <div className={styles.footerSection}>
          <p className={styles.title}>Projects</p>
          <ul className={styles.list}>
            <li>Project 1</li>
            <li>Project 2</li>
            <li>Muunifi</li>
            <li>Project 4</li>

          </ul>
        </div>
        <div className={styles.footerSection}>
          <p className={styles.title}>Site map</p>
          <ul className={styles.list2}>
            <li>Home</li>
            <li>Projects</li>
            <li>About me</li>
            <li>Showcase</li>

          </ul>
        </div>
        
        <div className={styles.bottomLinks}>
          <p>Justin Delille</p>
          <p>Portfolio</p>
          <p>LOGO</p>
        </div>
      </footer>
    </div>
  );
}
