import Image from "next/image"; // ← THIS LINE IS CRUCIAL
import cat2 from "../../../../docs/assets/img/cat02siamese_dab.png";
import logo from "../../../../docs/assets/img/logo_feedthismuch.png";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Welcome!</h1>
      </header>

      <div className={styles.description}>
        <p>Feed this much is a web app dedicated to helping you feed your cats and dogs the right amount to keep them healthy and happy.
            All you have to do is enter information about your pet and the food you want to give them, and we will apply the science to create a custom feeding plan just for them.
            To get started, press the button below.</p>

        <Image 
          src={cat2}
          alt="Siamese cat dabbing" 
          width={400} 
          height={400} 
          className={styles.catImage}
        />

        <Image 
          src={logo}
          alt="" 
          width={500} 
          height={500} 
          className={styles.logo}
        />

      </div>

    </div>
  );
}
