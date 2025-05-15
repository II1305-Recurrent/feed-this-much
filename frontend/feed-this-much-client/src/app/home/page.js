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

import { useModel } from "../Model";

import { useEffect } from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { getRequest } from "@/utils/fetchApi";
import { deleteRequest } from "@/utils/fetchApi";

import { get } from "http";
import { exportFeedingPlansPdf, exportFeedingPlanPdf } from "../displayplan/pdfExport";

export default function Home() {
    const router = useRouter();
    const [pets, setPets] = useState([]);
    const [foods, setFoods] = useState([]);
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { setIndex, setCatFields, setDogFields, edit, setToCat, setToDog, doEdit } = useModel();
    const [user, setUser] = useState([]);
    async function getUser() {
        const response = await getRequest({ path: '/api/get-user/' });
        if (response.ok) {
            setUser(response.payload)
        }

    }
    useEffect(() => {
        getUser()
    }, []);
    useEffect(() => {
        if (user) {
            router.refresh();
        }
    }, [user]);

    // generic helper to call DELETE endpoints
    async function deleteResource(resource, id) {
        const res = await deleteRequest({ path: `/api/delete-${resource}/${id}/` });
        if (!res.ok) {
            throw new Error(res.payload?.message || `${resource} delete failed`);
        }
    }

    // Handlers for each type
    async function handleDeletePet(id) {
        try {
            await deleteResource('pet', id);
            setPets(prev => prev.filter(p => p.id !== id));
        } catch (e) {
            setError(e.message);
        }
    }

    async function handleDeleteFood(id) {
        try {
            await deleteResource('food', id);
            setFoods(prev => prev.filter(f => f.id !== id));
        } catch (e) {
            setError(e.message);
        }
    }

    async function handleDeletePlan(id) {
        try {

            await deleteResource('combined-plan', id);

            setPlans(prev => prev.filter(pl => pl.id !== id));
        } catch (e) {
            setError(e.message);
        }
    }

    function setPetForEditing(id) {
        //fetch pet by ID
        const selectedPet = pets.find(p => p.id === id);
        if (!selectedPet) return;

        if (selectedPet.species === "cat") {
            doEdit();
            setToCat();
            setCatFields({ fieldName: "name", value: selectedPet.name });
            setCatFields({ fieldName: "id", value: selectedPet.id });

        } else {
            doEdit();
            setToDog();
            setDogFields({ fieldName: "name", value: selectedPet.name });
            setDogFields({ fieldName: "id", value: selectedPet.id });
        }
    }

    // Fetch the Data
    useEffect(() => {
        async function fetchData() {
            try {
                const foodRes = await getRequest({ path: "/api/get-foods/" });
                const petRes = await getRequest({ path: "/api/get-pets/" });
                const planRes = await getRequest({ path: "/api/get-combined-plans-all/" }); // updated to call combined

                if (foodRes.ok) {
                    setFoods(Array.isArray(foodRes.payload) ? foodRes.payload : []);
                }

                if (petRes.ok) {
                    setPets(Array.isArray(petRes.payload) ? petRes.payload : []);
                }
                if (planRes.ok) {
                    setPlans(Array.isArray(planRes.payload) ? planRes.payload : []);
                }

                if (planRes.ok) {
                    setPlans(Array.isArray(planRes.payload) ? planRes.payload : []);
                }

            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }

        }

        fetchData();
    }, []);

    useEffect(() => {
        if (edit) {
            router.push('/add-pet');
        }
    }, [edit, router]);

    return (
        <div className="page">
            <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Hi {user.first_name}!
            </h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg text-[var(--custom-brown)]">Pets</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full">
                            {pets.map((item) => {
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
                                            <Button variant="ghost" onClick={() => handleDeletePet(item.id)}>
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
                                <Button variant="plus" onClick={() => router.push("/add-pet")}>
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
                                return (
                                    <div key={foodItem.id} className="flex justify-between w-full h-6">
                                        <p className="text-md text-[var(--custom-brown)] flex justify-center items-center">{foodItem.food_name}</p>
                                        <Button variant="ghost" onClick={() => handleDeleteFood(foodItem.id)}>
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
                                <Button variant="plus" onClick={() => router.push("/add-food")}>
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
                            {
                                plans.map((item) => {
                                    return (
                                        //TODO: CHANGE WHEN ID IS ADDED TO PLAN SERIALIZER - done!
                                        <div key={item.id} className="flex justify-between w-full h-8">
                                            <Button key={item.id} variant="ghost" onClick={() => {
                                                setIndex(item.id);
                                                router.push(`/displayplan?id=${item.id}`); // sets the id of the plan to show on the display plan page
                                            }} className="flex justify-center items-center">
                                                <p className="text-md text-[var(--custom-brown)] float-left">{item.plan_title}</p>
                                            </Button>
                                            <Button variant="ghost" onClick={() => handleDeletePlan(item.id)}>
                                                <Image
                                                    src="/delete-icon.png"
                                                    alt=""
                                                    width={15}
                                                    height={15}></Image>
                                            </Button>
                                        </div>
                                    );
                                })
                            }
                            <div className="inline-flex items-center gap-2 !p-[2px]">
                                <Button variant="plus" onClick={() => router.push("/calc-new-plan")} disabled={!(pets.length && foods.length)}>
                                    <Image src="/plus-sign-circle-icon.png"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className={styles.logo}>
                                    </Image>
                                    <p className="text-[var(--custom-brown)] !pr-2">Calculate new plan</p>
                                </Button>
                                <Button variant="plus" onClick={() => exportFeedingPlansPdf()} disabled={!(plans.length)}>
                                    <p className="inline-block text-[var(--custom-brown)] !pl-2 !pr-2">Export All</p>
                                </Button>
                            </div>
                        </div >
                    </AccordionContent >
                </AccordionItem >
            </Accordion >
        </div >
    )
}
