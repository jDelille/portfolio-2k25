import React from "react";
import styles from "./About.module.scss";

type AboutProps = {};
const About: React.FC<AboutProps> = () => {
  return (
    <div className={styles.about}>
      <h1>About Me</h1>
      <p>
        Hey, I'm Justin. I love coding, creating websites, and learning new
        technolgies to make myself a better, more efficient developer. My
        passion for web development started in college at Arizona State
        University where I studied computer science. I decided to take my skills
        to the next level by enrolling in a Full Stack Web Development bootcamp
        called DevMountain. I then worked with an amazing company called 808
        Partners where my skills and passion as a developer sky rocketed.
      </p>
    </div>
  );
};

export default About;
