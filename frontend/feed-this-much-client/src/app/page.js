import Image from "next/image"; // ← THIS LINE IS CRUCIAL
import cat2 from "../../../../docs/assets/img/cat02siamese_dab.png";
import logo from "../../../../docs/assets/img/logo_feedthismuch.png";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Welcome!
      </h1>

      <div>
        <p className="leading-7 [&:not(:first-child)]:mt-6"><b>Feed this much</b> is a web app dedicated to helping you feed your cats and dogs the right amount to keep them healthy and happy.
            </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6"> All you have to do is enter information about your pet and the food you want to give them, and we will apply the science to create a custom feeding plan just for them.</p>
        <p className="leading-7 [&:not(:first-child)]:mt-6"> To get started, press the button below. </p>

        <Image 
          src={cat2}
          alt="Siamese cat dabbing" 
          width={432} 
          height={540} 
          className={styles.catImage}
        />

        <Image 
          src={logo}
          alt="" 
          width={500} 
          height={500} 
          className={styles.logo}
        />

        <Button>Button</Button>

      </div>

    </div>
  );
}
