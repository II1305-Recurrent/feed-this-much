"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

import styles from "@/app/page.module.css";
import Image from "next/image";

import AddPlanForm from "./addPlanForm"

export default function foodPage() {
    return (<div style={{ padding: "5%" }}>
        <div className="flex justify-between">
            <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
                Add Food
            </h1>
            <Button variant="destructive" onClick={() => redirect("/home")}>
                <Image src="/back-arrow.png"
                    alt=""
                    width={20}
                    height={20}
                    className={styles.logo}>
                </Image>
            </Button>
        </div>
        <div className="flex justify-center min-h-screen">
            <AddPlanForm />
        </div>
    </div>
    )
}
