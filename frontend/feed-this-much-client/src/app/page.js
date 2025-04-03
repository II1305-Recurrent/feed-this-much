"use client"

import Image from "next/image"; 
import {redirect} from "next/navigation";
import cat2 from "@/../../../docs/assets/img/cat02siamese_dab.png";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import {useState} from "react";

export default function NotSignedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  isLoggedIn ? redirect("/home") : {}
  return (
    <div style={{padding: "5%"}}>
      <Image 
          src="/logo_feedthismuch.png"
          alt="" 
          width={180} 
          height={100.5} 
          className={styles.logo}
        />
      <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
      Welcome!
      </h1>

      <div>
        <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4"><b>Feed this much </b> 
         is a web app dedicated to helping you feed your cats and dogs the right amount to keep them healthy and happy. <br />
        All you have to do is enter information about your pet and the food you want to give them, and we will apply the science to create a custom feeding plan just for them.<br />
        To get started, press the button below. </p>

        <Image 
          src="/cat02siamese_dab.png"
          alt="Siamese cat dabbing" 
          width={216} 
          height={270} 
          className={styles.catImage}
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={() => redirect("/sign-in")} className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs mx-auto">
          Get Started
        </Button>
      </div>
    </div>
  );
}