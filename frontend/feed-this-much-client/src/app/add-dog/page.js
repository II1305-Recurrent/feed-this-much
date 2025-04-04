"use client"

import {redirect} from "next/navigation"
import { Button } from "@/components/ui/button"

import DogForm from "./DogForm"

export default function petPage() {
    return <div>
        <h1>Add Dog</h1>
        <DogForm />
        <Button variant="destructive" onClick={() => redirect("/add-pet")}>Back</Button>
    </div>
}