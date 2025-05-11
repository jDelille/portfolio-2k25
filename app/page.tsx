import HomeContent from "@/components/home-content/HomeContent";
import styles from "../scss/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeContent />
    </div>
  );
}
