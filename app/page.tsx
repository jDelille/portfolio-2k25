"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Footer from "@/components/footer/Footer";
import styles from "../scss/page.module.scss";

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
            scaleX: 0.90,
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

      <Footer />
    </div>
  );
}
