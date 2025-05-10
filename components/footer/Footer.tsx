import React from "react";
import styles from "./Footer.module.scss";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSections}>
        <div className={styles.projects}>
          <p className={styles.title}>Projects</p>
          <ul className={styles.projectsList}>
            <li>Project 1</li>
            <li>Project 2</li>
            <li>Muunifi</li>
            <li>Project 4</li>
          </ul>
        </div>
        <div className={styles.sitemap}>
          <p className={styles.title}>Sitemap</p>
          <ul className={styles.sitemapList}>
            <li>Home</li>
            <li>Projects</li>
            <li>About me</li>
            <li>Showcase</li>
            <li>Contact me</li>
          </ul>
        </div>
        <div className={styles.socials}>
            <p className={styles.title}>Socials</p>
            <ul className={styles.socialsList}>
                <li>Github</li>
                <li>Linkedin</li>
                <li>Youtube</li>
            </ul>
        </div>
        <div className={styles.articles}>
            <p className={styles.title}>Articles</p>
            <ul className={styles.articlesList}>
                <li>Getting started with GSAP</li>
                <li>Building an interactive guitar fretboard</li>
                <li>Working with 3rd party APIs</li>
                <li>Seperation of concerns</li>
            </ul>
        </div>
      </div>

      <div className={styles.bottomLinks}>
        <p className={styles.name}>Justin Delille</p>
        <p className={styles.title}>Portfolio</p>
        <p className={styles.logo}>LOGO</p>
      </div>
    </footer>
  );
};

export default Footer;
