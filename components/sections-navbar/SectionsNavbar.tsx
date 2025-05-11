"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { Scrollspy } from "@makotot/ghostui";
import styles from "./SectionsNavbar.module.scss";

type SectionsNavbarProps = {
  onSetActiveLink: (link: string) => void;
  activeLink: string;
};

const SectionsNavbar: React.FC<SectionsNavbarProps> = ({
  onSetActiveLink,
  activeLink,
}) => {
  const sectionIds = ["projects", "about", "contact"];
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const sectionRefs = sectionIds.map(() => useRef<HTMLDivElement>(null));     

  useEffect(() => {
    const handleScroll = () => {
      if (scrollEnabled) {
        const currentSection = sectionIds.find((id) => {
          const section = document.getElementById(id);
          if (section) {
            const rect = section.getBoundingClientRect();
            return (
              rect.top <= window.innerHeight / 2 &&
              rect.bottom >= window.innerHeight / 2
            );
          }
          return false;
        });
        if (currentSection) {
          onSetActiveLink(currentSection);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, onSetActiveLink, scrollEnabled]);

  const handleNavClick = (link: string) => {
    setScrollEnabled(false);
    onSetActiveLink(link);
    setTimeout(() => setScrollEnabled(true), 1000);
  };

  const getLineClass = (linkId: string) =>
    activeLink === linkId ? styles.extendedLine : styles.shortLine;

  const getActiveClass = (linkId: string) =>
    activeLink === linkId
      ? `${styles.number} ${styles.activeNumber}`
      : styles.number;

  const getActiveLabel = (linkId: string) =>
    activeLink === linkId ? styles.active : styles.inactive;

  return (
    <Scrollspy
      sectionRefs={sectionRefs}
    >
      {({ elementsStatusInViewport, currentElementIndexInViewport }) => (
        <nav className={styles.navbar}>
          <ul>
            <li
              className={styles.navLink}
              onClick={() => {
                onSetActiveLink("projects");
                handleNavClick("projects");
              }}
            >
              <span className={getActiveClass("projects")}>01</span>
              <a href="#projects" className={getActiveLabel("projects")}>
                <span className={getLineClass("projects")} />
                Projects
              </a>
            </li>

            <li
              className={styles.navLink}
              onClick={() => {
                onSetActiveLink("about");
                handleNavClick("about");
              }}
            >
              <span className={getActiveClass("about")}>02</span>
              <a href="#about" className={getActiveLabel("about")}>
                <span className={getLineClass("about")} />
                About
              </a>
            </li>

            <li
              className={styles.navLink}
              onClick={() => {
                onSetActiveLink("contact");
                handleNavClick("contact");
              }}
            >
              <span className={getActiveClass("contact")}>03</span>
              <a href="#contact" className={getActiveLabel("contact")}>
                <span className={getLineClass("contact")} />
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </Scrollspy>
  );
};

export default SectionsNavbar;