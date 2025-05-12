import React, { useRef, useState, useEffect } from "react";
import styles from "./Projects.module.scss";
import gsap from "gsap";

const projectNames = ["Fretted", "Muunifi", "Prophit"];

const projectImages: Record<string, string> = {
  Fretted: "/fretted.jpg",
  Prophit: "/prophit.jpg",
  Muunifi: "/muunifi.jpg",
};

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

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
      x: 100,
      opacity: 0,
      stagger: 0.4,
      duration: 1,
      ease: "power2.out",
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
          y: -380 * i,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const backgroundColors = ["#000", "#2f1e2e", "#1e2f2f"];

  return (
    <>
      <div className={styles.itemsWorks}>
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
