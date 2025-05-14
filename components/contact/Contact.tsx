import React from 'react';
import styles from './Contact.module.scss';

type ContactProps = {
 
 }
const Contact: React.FC<ContactProps> = () => {
  return (
    <div className={styles.contact} id='contact'>
      <h1>Contact Me</h1>
    </div>
  );
};

export default Contact;