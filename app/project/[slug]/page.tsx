"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from './page.module.scss';
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

gsap.registerPlugin(ScrollTrigger);

type ProjectPageProps = {};

const ProjectPage: React.FC<ProjectPageProps> = () => {
  
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: contentRef.current,
            start: "bottom bottom-=180",
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
        <Navbar />
        <div className={styles.test}>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectPage;