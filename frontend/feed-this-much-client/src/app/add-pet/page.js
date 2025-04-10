"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CatForm from "./CatForm"
import DogForm from "./DogForm"
import styles from "@/app/page.module.css";
import Image from "next/image";


export default function petPage() {
    return (<div style={{ padding: "5%" }}>
        <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
            Add new pet
        </h1>
        <div className="flex justify-center min-h-screen">
            <Tabs defaultValue="sign-in" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cat">Cat</TabsTrigger>
                    <TabsTrigger value="dog">Dog</TabsTrigger>
                </TabsList>
                <TabsContent value="cat">
                    <CatForm />
                </TabsContent>
                <TabsContent value="dog">
                    <DogForm />
                </TabsContent>
            </Tabs>
            <Button variant="destructive" onClick={() => redirect("/home")}>
                <Image src="/back-arrow.png"
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
