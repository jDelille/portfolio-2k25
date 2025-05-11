import StickyIntroPanel from "@/components/sticky-intro-panel/StickyIntroPanel";
import styles from "../scss/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.fixed}>
        <StickyIntroPanel />
      </div>
    </div>
  );
}
