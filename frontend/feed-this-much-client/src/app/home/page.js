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

import {redirect} from "next/navigation"

import plus from "@/../../../docs/assets/img/plus-sign-circle-icon.png"

export default function Home(){
    const pets = [{id:1, title: "Mac"}]; //will need to be fetched from API
    const foods = [{id:1, title: "Fancy Chow"}];
    const plans = [{id:1, title: "Plan 1 for Mac"}];
    return(
        <div style={{padding: "5%"}}>
            <Image 
                src="/logo_feedthismuch.png"
                alt="" 
                width={180} 
                height={100.5} 
                className={styles.logo}
                />
            <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
            Hi! You are now logged in.
            </h1>
            <Accordion type="single" collapsible className="w-full !pt-8">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg text-[var(--custom-brown)]">Pets</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            {pets.map((item) => 
                                <p className="text-md text-[var(--custom-brown)]" key={item.id}>{item.title}</p>)
                            }
                            <div className="inline-flex items-center gap-2 !p-[2px]">
                                <Button variant="plus" onClick={() => redirect("/add-pet")}>
                                    <Image src={plus}
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
                            {foods.map((item) => 
                                <p className="text-md text-[var(--custom-brown)]" key={item.id}>{item.title}</p>)
                            }
                            <div className="inline-flex items-center gap-2 !p-[2px]">
                                <Button variant="plus">
                                    <Image src={plus}
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
                                <p className="text-md text-[var(--custom-brown)]" key={item.id}>{item.title}</p>)
                            }
                            <div className="inline-flex items-center gap-2 !p-[2px]">
                                <Button variant="plus">
                                    <Image src={plus}
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
