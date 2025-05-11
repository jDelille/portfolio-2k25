import React, { useEffect, useRef } from "react";
import styles from './Projects.module.scss';
import gsap from "gsap";

const projectNames = ["Fretted", "Muunifi", "Prophit", "Project Name", "Project Name"];

const Projects: React.FC = () => {
  const projectRefs = useRef<HTMLDivElement[]>([]);

  // Clear refs on re-render
  projectRefs.current = [];

  useEffect(() => {
    if (projectRefs.current.length > 0) {
      gsap.fromTo(
        projectRefs.current,
        {
          x: 300,       // from 300px to the right
          opacity: 0,
          visibility: "visible",   
        },
        {
          x: 0,         // to natural position
          opacity: 1,   // to fully visible
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          immediateRender: true,
        }
      );
    }
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  return (
    <ul className={styles.projectsList}>
      {projectNames.map((name, index) => (
        <div
          key={index}
          className={styles.project}
          ref={addToRefs}
        >
          <h2 className={styles.name}>{name}</h2>
        </div>
      ))}
    </ul>
  );
};

export default Projects;