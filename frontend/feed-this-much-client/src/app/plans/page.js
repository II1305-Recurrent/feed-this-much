"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useModel } from "../Model";
import Image from "next/image";
import { useState } from "react";
import { getRequest } from "@/utils/fetchApi";

export default function Plan() {
    //const plan = { id: 0, title: "Plan 1 for Mac", pet: { id: 0, name: "Mac" }, foods: [{ id: 0, name: "Fancy Chow", amount: 2, servingType: "scoop" }, { id: 1, name: "Nice food", amount: 1, servingType: "tin" }] }
    const [plans, setPlans] = useState([]);

    async function getPlans() {
        const response = await getRequest({ path: '/api/get-foods/' });
        if (response.ok) {
            if (response.payload !== "No plans yet") {
                setPlans(response.payload);
                console.log("Plans fetched")
            }
        }
    }
    const { planIndex } = useModel();
    return (
        <div className="page">
            <div className="flex justify-between"><h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                {plan.title}
            </h1>
                <Button variant="destructive" onClick={() => redirect("/home")}>
                    <Image src="/back-arrow.png"
                        alt=""
                        width={20}
                        height={20} >
                    </Image>
                </Button></div>
            {plans[0].foods.map((item) =>
                <div key={item.id} className="flex justify-between">
                    <p className="text-[var(--custom-brown)]">{item.name}</p>
                    <div className="flex gap-x-1"><p className="text-[var(--custom-brown)]">{item.amount}</p>
                        <p className="text-[var(--custom-brown)]">{item.servingType}</p></div>
                </div>
            )}
        </div>
    )
}