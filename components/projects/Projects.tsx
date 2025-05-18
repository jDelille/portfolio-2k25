import React, { useRef, useState, useEffect, RefObject } from "react";
import styles from "./Projects.module.scss";
import gsap from "gsap";
import projects from "../../data/projects.json";

const projectNames = ["Fretted", "Muunifi", "Prophit", "Something"];

const projectImages: Record<string, string> = {
  Fretted: "/fretted.jpg",
  Prophit: "/prophit.jpg",
  Muunifi: "/muunifi.jpg",
  Something: "/something.jpg",
};

type ProjectsType = {};

const Projects: React.FC<ProjectsType> = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  const [animationComplete, setAnimationComplete] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isAnyProjectHovered, setIsAnyProjectHovered] = useState(false);

  const handleProjectHover = (index: number) => {
    setHoveredProject(index);
    setIsAnyProjectHovered(true);
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
    setIsAnyProjectHovered(false);
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  const addToContentRefs = (el: HTMLDivElement | null) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    const images = imagesRef.current;
    const content = contentRefs.current;

    if (!gallery || !images || !content) return;

    gsap.set(gallery, { autoAlpha: 0 });

    itemRefs.current.forEach((item, index) => {
      gsap.set(contentRefs.current[index], { opacity: 0, y: 20 });

      gsap.from(item, {
        x: 1000,
        opacity: 1,
        duration: 1,
        delay: index * 0.3,
        ease: "circ.out",
      });

      gsap.to(contentRefs.current[index], {
        opacity: 1,
        y: -20,
        duration: 0.4,
        ease: "power2.out",
        delay: index * 0.3 + 0.7,
      });

      if (index === itemRefs.current.length - 1) {
        setTimeout(() => setAnimationComplete(true), (index * 0.3 + 1) * 1000);
      }
    });

    // Mouse move follows cursor
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(gallery, {
        top: e.clientY,
        left: e.clientX,
        xPercent: -50,
        yPercent: -50,
        duration: 0.2,
        ease: "power1.out",
      });
    };

    if (!animationComplete) {
      window.addEventListener("mousemove", handleMouseMove);

      const container = document.querySelector(`.${styles.itemsWorks}`);

      container?.addEventListener("mouseenter", () => {
        gsap.to(gallery, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power1.out",
          opacity: 1,
          scale: 1,
        });
      });

      container?.addEventListener("mouseleave", () => {
        gsap.to(gallery, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power1.out",
          opacity: 0,
          scale: 0,
        });
      });

      itemRefs.current.forEach((el, i) => {
        el.addEventListener("mouseenter", () => {
          setActiveIndex(i);
          gsap.to(images, {
            y: -300 * i,
            duration: 0.2,
            ease: "power1.out",
          });
        });
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const backgroundColors = ["#213448", "#210F37", "#1e2f2f", "8321dwq"];

  console.log(isAnyProjectHovered);

  return (
    <>
      <div id="projects" className={styles.itemsWorks}>
        {isAnyProjectHovered && <div className={styles.overlay}></div>}
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={addToRefs}
            className={styles.itemWork}
            onMouseEnter={() => handleProjectHover(index)}
            onMouseLeave={handleProjectLeave}
          >
            {isAnyProjectHovered && hoveredProject !== index && (
              <div className={styles.overlay}></div>
            )}
            <div className={styles.content} ref={addToContentRefs}>
              <div className={styles.build}>
                  {project.technologies}
               
              </div>
              <p className={styles.name}>{project.name}</p>
              <p className={styles.description}>{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div id="gallery-work" ref={galleryRef} className={styles.galleryWork}>
        <div id="work-images" ref={imagesRef} className={styles.workImages}>
          {projectNames.map((name, index) => (
            <div
              key={index}
              className={styles.imageWrapper}
              style={{
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
              }}
            >
              <img
                src={projectImages[name]}
                alt={name}
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
