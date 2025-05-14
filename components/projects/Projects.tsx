import React, { useRef, useState, useEffect, RefObject } from "react";
import styles from "./Projects.module.scss";
import gsap from "gsap";

const projectNames = ["Fretted", "Muunifi", "Prophit", "Something"];

const projectImages: Record<string, string> = {
  Fretted: "/fretted.jpg",
  Prophit: "/prophit.jpg",
  Muunifi: "/muunifi.jpg",
  Something: "/something.jpg"
};

type ProjectsType = {
}

const Projects: React.FC<ProjectsType> = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };


  useEffect(() => {
    const gallery = galleryRef.current;
    const images = imagesRef.current;

    if (!gallery || !images) return;

    gsap.set(gallery, { autoAlpha: 0 });


    gsap.from(itemRefs.current, {
      x: 800,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      ease: "circ.out",
      onComplete: () => {
        setAnimationComplete(true);
      },
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


    if(!animationComplete) {
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
            y: -350 * i,
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

  const backgroundColors = ["#000", "#2f1e2e", "#1e2f2f", "8321dwq"];

  return (
    <>
      <div id="projects" className={styles.itemsWorks}>
        {projectNames.map((name, index) => (
          <div key={index} ref={addToRefs} className={styles.itemWork}>
            {name}
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
