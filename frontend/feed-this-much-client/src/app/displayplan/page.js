"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Suspense } from 'react';
import Image from "next/image";
import styles from "@/app/page.module.css";

import DisplayPlan from "./DisplayPlan";

export default function Plan() {

    return (
        <div className="page">
            <div className="flex justify-between">
                <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                    Feeding Plan
                </h1>
                <div className="flex items-center gap-4">
                    <Button variant="destructive" onClick={() => alert("export invoked")}>
                        <p className="inline-block text-[var(--custom-brown)] !pl-2 !pr-2">Export</p>
                    </Button>
                    <Button variant="destructive" onClick={() => redirect("/home")}>
                        <Image src="/back-arrow.png"
                            alt="Back"
                            width={20}
                            height={20}
                            className={styles.logo}
                        />
                    </Button></div>
            </div>
            <Suspense>
                <DisplayPlan />
            </Suspense>
        </div>
    )

}

