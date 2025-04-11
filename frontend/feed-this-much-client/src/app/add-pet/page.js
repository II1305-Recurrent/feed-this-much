"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CatForm from "./CatForm"
import DogForm from "./DogForm"
import styles from "@/app/page.module.css";
import Image from "next/image";
import { useModel } from "../Model"


export default function PetPage() {
    const { pet, resetCatFields, resetDogFields, cat, dog } = useModel();
    if (cat.name) {
        return (<div className="page">
            <div className="flex justify-between">
                <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                    Edit your cat&apos;s details
                </h1>
                <Button variant="destructive" onClick={() => { resetCatFields(); redirect("/home") }}>
                    <Image src="/back-arrow.png"
                        alt=""
                        width={20}
                        height={20}
                        className={styles.logo}>
                    </Image>
                </Button>
            </div>
            <div className="flex justify-center min-h-screen">
                <CatForm />
            </div>
        </div>)
    }
    else if (dog.name) {
        return (<div className="page">
            <div className="flex justify-between">
                <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                    Edit your dog&apos;s details
                </h1>
                <Button variant="destructive" onClick={() => { resetDogFields(); redirect("/home") }}>
                    <Image src="/back-arrow.png"
                        alt=""
                        width={20}
                        height={20}
                        className={styles.logo}>
                    </Image>
                </Button>
            </div>
            <div className="flex justify-center min-h-screen">
                <DogForm />
            </div>
        </div>)
    }
    else {
        return (<div className="page">
            <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Add new pet
            </h1>
            <div className="flex justify-center min-h-screen">
                <Tabs defaultValue={pet} className="w-[400px]">
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
                <Button variant="destructive" onClick={() => { resetCatFields(); resetDogFields(); redirect("/home") }}>
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
}
