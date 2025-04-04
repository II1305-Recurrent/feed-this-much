"use client"

import {redirect} from "next/navigation"
import { Button } from "@/components/ui/button"

import CatForm from "./CatForm"

export default function petPage() {
    return <div>
        <h1>Add Cat</h1>
        <CatForm />
        <Button variant="destructive" onClick={() => redirect("/add-pet")}>Back</Button>
    </div>
}