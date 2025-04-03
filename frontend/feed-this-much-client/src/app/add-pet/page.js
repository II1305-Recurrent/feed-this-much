"use client"

import {redirect} from "next/navigation"
import { Button } from "@/components/ui/button"

export default function petPage() {
    return <div>
        <h1>Add Pet</h1>
        <Button onClick={() => redirect("/add-cat")}>Cat</Button>
        <Button onClick={() => redirect("/add-dog")}>Dog</Button>
    </div>
}