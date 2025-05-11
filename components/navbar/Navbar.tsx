import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className={styles.navbar}>
      <p className={styles.logo}>Justin D.</p>
      <ul className={styles.links}>
        <Link href="/projects">Projects</Link>
        <Link href="/about-me">About me</Link>
        <Link href="/showcase">Showcase</Link>
        <Link href="/contact-me">Contact me</Link>

      </ul>
      <div className={styles.extra}>
        Something
      </div>
    </div>
  );
};

export default Navbar;