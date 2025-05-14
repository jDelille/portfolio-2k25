"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeContent.module.scss";
import StickyIntroPanel from "../sticky-intro-panel/StickyIntroPanel";
import Projects from "../projects/Projects";
import About from "../about/About";

type HomeContentProps = {};
const HomeContent: React.FC<HomeContentProps> = () => {
  const [activeLink, setActiveLink] = useState("projects");
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRefs = {
    projects: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link);
  };

  const handleScroll = () => {
    const currentPosition = window.pageYOffset;
    setScrollPosition(currentPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = Object.keys(sectionRefs) as Array<
      keyof typeof sectionRefs
    >;

    for (let i = 0; i < sectionIds.length; i++) {
      const sectionId = sectionIds[i];
      const sectionRef = sectionRefs[sectionId];
      if (sectionRef.current) {
        const top = sectionRef.current.offsetTop;
        const bottom = top + sectionRef.current.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveLink(sectionId);
        }
      }
    }
  }, [scrollPosition, sectionRefs]);

  return (
    <div className={styles.homeContent}>
      <div className={styles.fixed}>
        <StickyIntroPanel
          onSetActiveLink={handleSetActiveLink}
          activeLink={activeLink}
        />
      </div>
      <div className={styles.scroll}>
        <Projects />
        <About />
      </div>
    </div>
  );
};

export default HomeContent;
