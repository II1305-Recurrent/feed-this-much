"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image";

import DisplayPlan from "./DisplayPlan";

export default function Plan() {

    return (
        <div className="page">
            <div className="flex justify-between"><h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Feeding Plan
            </h1>
                <Button variant="destructive" onClick={() => redirect("/home")}>
                    <Image src="/back-arrow.png"
                        alt=""
                        width={20}
                        height={20} >
                    </Image>
                </Button></div>
            <DisplayPlan />
        </div>
    )

}

