"use client"

import {redirect} from "next/navigation"
import { Button } from "@/components/ui/button"

import back from "@/../../../docs/assets/img/back-arrow.png"
import styles from "@/app/page.module.css";
import Image from "next/image";

import FoodForm from "./FoodForm"

export default function foodPage() {
    return (<div style={{padding: "5%"}}>
        <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
            Add Food
        </h1>
        <div className="flex justify-center min-h-screen">
        <FoodForm />
        <Button variant="destructive" onClick={() => redirect("/home")}>
            <Image src={back}
                alt="" 
                width={20} 
                height={20} 
                className={styles.logo}>
            </Image>
        </Button>
        </div>
        </div>
    )
}