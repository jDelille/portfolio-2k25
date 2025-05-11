import React from "react";
import styles from "./StickIntroPanel.module.scss";
import SectionsNavbar from "../sections-navbar/SectionsNavbar";

type StickyIntroPanelProps = {
  onSetActiveLink: (link: string) => void;
  activeLink: string;
};

const StickyIntroPanel: React.FC<StickyIntroPanelProps> = ({ onSetActiveLink, activeLink }) => {
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

      <div className={styles.socials}>
        <img src="/me.jpg" alt="" />

        <div className={styles.social}>
            Github
        </div>
        <div className={styles.social}>
            Linkedin
        </div>
      </div>
    </div>
  );
};

export default StickyIntroPanel;
