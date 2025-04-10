"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useModel } from "../Model";
import Image from "next/image";

export default function Plan() {
    const plan = { id: 0, title: "Plan 1 for Mac", pet: { id: 0, name: "Mac" }, foods: [{ id: 0, name: "Fancy Chow", amount: 2, servingType: "scoop" }, { id: 1, name: "Nice food", amount: 1, servingType: "tin" }] }
    const { planIndex } = useModel();
    return (
        <div style={{ paddingBottom: "5%", paddingLeft: "5%", paddingRight: "5%" }}>
            <div className="flex justify-between"><h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-4">
                {plan.title}
            </h1>
                <Button variant="destructive" onClick={() => redirect("/home")}>
                    <Image src="/back-arrow.png"
                        alt=""
                        width={20}
                        height={20} >
                    </Image>
                </Button></div>
            {plan.foods.map((item) =>
                <div key={item.id} className="flex justify-between">
                    <p className="text-[var(--custom-brown)]">{item.name}</p>
                    <div className="flex gap-x-1"><p className="text-[var(--custom-brown)]">{item.amount}</p>
                        <p className="text-[var(--custom-brown)]">{item.servingType}</p></div>
                </div>
            )}
        </div>
    )
}