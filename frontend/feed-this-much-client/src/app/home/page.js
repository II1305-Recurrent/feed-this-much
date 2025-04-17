"use client"

import Image from "next/image";
import styles from "@/app/page.module.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation"
import { useModel } from "../Model";

import { useEffect } from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { getRequest } from "@/utils/fetchApi";


export default function Home() {
    const router = useRouter();
    const [pets, setPets] = useState([]);
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    //const pets = [{ id: 0, name: "Little bitch", species: "cat" }, { id: 1, name: "Poppy", species: "dog" }, { id: 2, name: "Mac", species: "cat" }]
    //const foods = [{ id: 0, name: "Fancy chow" }, { id: 1, name: "Foooood" }]
    const plans = [{ id: 1, title: "Test Plan" }];
    const { setIndex, setCatFields, setDogFields, cat, dog, setToCat, setToDog, doEdit } = useModel();

    function setPetForEditing(id) {
        //fetch pet by ID
        const selectedPet = pets.find(p => p.id === id);
        if (!selectedPet) return;

        if (selectedPet.species === "cat") {
            doEdit();
            setToCat();
            setCatFields({ fieldName: "name", value: selectedPet.name });
        } else {
            doEdit();
            setToDog();
            setDogFields({ fieldName: "name", value: selectedPet.name });
        }
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const foodRes = await getRequest({ path: "/api/get-foods/" });
                const petRes = await getRequest({ path: "/api/get-pets/" });

                if (foodRes.ok) {
                    setFoods(Array.isArray(foodRes.payload) ? foodRes.payload : []);
                }

                if (petRes.ok) {
                    setPets(Array.isArray(petRes.payload) ? petRes.payload : []);
                }

            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }

        }

        fetchData();
    }, []);
    useEffect(() => {
        if (cat.name || dog.name) {
            router.push('/add-pet');
        }
    }, [cat.name, dog.name, router]);
    return (
        <div className="page">
            <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Hi! You are now logged in.
            </h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg text-[var(--custom-brown)]">Pets</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full">
                            {pets.map((item) => {
                                console.log('Rendering petItem:', item);
                                return (
                                    <div key={item.id} className="flex justify-between w-full h-6">
                                        <p className="text-md text-[var(--custom-brown)] flex justify-center items-center">{item.name}</p>
                                        <div className=" flex justify-center items-center gap-2">
                                            <Button variant="ghost" onClick={() => setPetForEditing(item.id)}>
                                                <Image
                                                    src="/edit-icon.png"
                                                    alt=""
                                                    width={15}
                                                    height={15}></Image>
                                            </Button>
                                            <Button variant="ghost" onClick={() => console.log("delete")}>
                                                <Image
                                                    src="/delete-icon.png"
                                                    alt=""
                                                    width={15}
                                                    height={15}></Image>
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="inline-flex items-center gap-2 !p-[2px]">
                                <Button variant="plus" onClick={() => redirect("/add-pet")}>
                                    <Image src="/plus-sign-circle-icon.png"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className={styles.logo}>
                                    </Image>
                                    <p className="text-[var(--custom-brown)] !pr-2">Add pet</p>
                                </Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg text-[var(--custom-brown)]">Food</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            {foods.map((foodItem) => {
                                console.log('Rendering foodItem:', foodItem);
                                return (
                                    <div key={foodItem.id} className="flex justify-between w-full h-6">
                                        <p className="text-md text-[var(--custom-brown)] flex justify-center items-center">{foodItem.food_name}</p>
                                        <Button variant="ghost" onClick={() => console.log("delete")}>
                                            <Image
                                                src="/delete-icon.png"
                                                alt=""
                                                width={15}
                                                height={15}></Image>
                                        </Button>
                                    </div>
                                );
                            })}
                            <div className="inline-flex items-center gap-2 !p-[2px]">
                                <Button variant="plus" onClick={() => redirect("/add-food")}>
                                    <Image src="/plus-sign-circle-icon.png"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className={styles.logo}>
                                    </Image>
                                    <p className="text-[var(--custom-brown)] !pr-2">Add food</p>
                                </Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg text-[var(--custom-brown)]">Feeding plans</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            {plans.map((item) =>
                                <div key={item.id} className="flex justify-between w-full h-6">
                                    <Button key={item.id} variant="ghost" onClick={() => { setIndex(item.id); redirect("/displayplan") }} className="flex justify-center items-center">
                                        <p className="text-md text-[var(--custom-brown)] float-left">{item.title}</p>
                                    </Button>
                                    <Button variant="ghost" onClick={() => console.log("delete")}>
                                        <Image
                                            src="/delete-icon.png"
                                            alt=""
                                            width={15}
                                            height={15}></Image>
                                    </Button>
                                </div>)
                            }
                            <div className="inline-flex items-center gap-2 !p-[2px]">
                                <Button variant="plus" onClick={() => redirect("/calc-new-plan")}>
                                    <Image src="/plus-sign-circle-icon.png"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className={styles.logo}>
                                    </Image>
                                    <p className="text-[var(--custom-brown)] !pr-2">Calculate new plan</p>
                                </Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
