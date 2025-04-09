"use client"

import {redirect} from "next/navigation"
import { Button } from "@/components/ui/button"

import FoodForm from "./FoodForm"

export default function foodPage() {
    return <div>
        <h1>Add Food</h1>
        <FoodForm />
        <Button variant="destructive" onClick={() => redirect("/home")}>Back</Button>
    </div>
}