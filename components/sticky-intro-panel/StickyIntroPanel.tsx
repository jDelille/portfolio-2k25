import React, { useEffect, useRef } from "react";
import styles from "./StickIntroPanel.module.scss";
import SectionsNavbar from "../sections-navbar/SectionsNavbar";
import { GithubIcon, LinkedinIcon } from "@/icons";
import gsap from "gsap";

type StickyIntroPanelProps = {
  onSetActiveLink: (link: string) => void;
  activeLink: string;
};

const StickyIntroPanel: React.FC<StickyIntroPanelProps> = ({ onSetActiveLink, activeLink }) => {

  const ref = useRef<HTMLDivElement>(null);
  const githubIconRef = useRef<HTMLDivElement>(null);
  const linkedinIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
  
    const elements = ref.current.querySelectorAll("img, div");
  
    gsap.set(elements, { opacity: 0, y: 30 });
  
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
      delay: 1
    });
  }, []);

  const shakeAnimation = (target: HTMLDivElement | null) => {
    if (!target) return;
  
    gsap.fromTo(
      target,
      { rotation: -10 },
      {
        rotation: 10,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        transformOrigin: "center",
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(target, { rotation: 0, duration: 0.1 });
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <h1>Justin Delille</h1>
      <h2>Software Developer</h2>
      <p className={styles.bio}>
        I create modern web experiences using React and TypeScript. My strengths
        lie in UI development and component-driven design. I value simplicity,
        speed, and a great developer experience. Always learning, always
        building.
      </p>

      <SectionsNavbar onSetActiveLink={onSetActiveLink} activeLink={activeLink} />

      <div className={styles.socials} ref={ref}>
        <img src="/me.jpg" alt="" />

        
        <div
          className={styles.social}
          onMouseEnter={() => shakeAnimation(githubIconRef.current)}
        >
          <div ref={githubIconRef}>
            <GithubIcon color="white" size={16} />
          </div>
          Github
        </div>
        <div
          className={styles.social}
          onMouseEnter={() => shakeAnimation(linkedinIconRef.current)}
        >
          <div ref={linkedinIconRef}>
            <LinkedinIcon color="white" size={16} />
          </div>
          Linkedin
        </div>
      </div>
    </div>
  );
};

export default StickyIntroPanel;
