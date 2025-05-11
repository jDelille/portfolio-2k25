import React, { useEffect, useMemo, useState } from "react";
import Scrollspy from "react-scrollspy";
import styles from "./SectionsNavbar.module.scss";

type SectionsNavbarProps = {
  onSetActiveLink: (link: string) => void;
  activeLink: string;
};

const SectionsNavbar: React.FC<SectionsNavbarProps> = ({
  onSetActiveLink,
  activeLink,
}) => {
  const sectionIds = useMemo(() => ["projects", "about", "contact"], []);
  const [scrollEnabled, setScrollEnabled] = useState(true);

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

    const cleanup = () => {
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return cleanup;
  }, [sectionIds, onSetActiveLink, scrollEnabled]);

  const handleNavClick = (link: string) => {
    setScrollEnabled(false);
    onSetActiveLink(link);
    setTimeout(() => setScrollEnabled(true), 1000);
  };

  return (
    <Scrollspy items={sectionIds} currentClassName="is-active">
      <nav className={styles.navbar}>
        <ul>
          <li
            className={styles.navLink}
            onClick={() => {
              onSetActiveLink("projects");
              handleNavClick("projects");
            }}
          >
            <span className={styles.number}>01</span>
            <a href="#projects">
              <span
                className={
                  activeLink === "projects"
                    ? styles.extendedLine
                    : styles.shortLine
                }
              ></span>
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
            <span className={styles.number}>02</span>
            <a href="#about">
              <span
                className={
                  activeLink === "about"
                    ? styles.extendedLine
                    : styles.shortLine
                }
              ></span>
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
            <span className={styles.number}>03</span>
            <a href="#contact">
              <span
                className={
                  activeLink === "contact"
                    ? styles.extendedLine
                    : styles.shortLine
                }
              ></span>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </Scrollspy>
  );
};

export default SectionsNavbar;
