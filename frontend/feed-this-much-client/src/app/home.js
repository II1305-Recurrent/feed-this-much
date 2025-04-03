import Image from "next/image"; 
import logo from "@/../../../docs/assets/img/logo_feedthismuch.png";
import styles from "./page.module.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

export default function Home(){
    return(
        <div style={{padding: "5%"}}>
            <Image 
                src={logo}
                alt="" 
                width={180} 
                height={100.5} 
                className={styles.logo}
                />
            <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
            Hi! You're now logged in.
            </h1>
            <Accordion type="single" collapsible className="w-full !pt-8">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[var(--custom-brown)]">Pets</AccordionTrigger>
                    <AccordionContent>
                        <div className="inline-flex items-center gap-2">
                            <Button>+</Button>
                            <p className="text-[var(--custom-brown)]">Add pet</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-[var(--custom-brown)]">Food</AccordionTrigger>
                    <AccordionContent>
                        <div className="inline-flex items-center gap-2">
                            <Button>+</Button>
                            <p className="text-[var(--custom-brown)]">Add food</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-[var(--custom-brown)]">Feeding plans</AccordionTrigger>
                    <AccordionContent>
                    <div className="inline-flex items-center gap-2">
                            <Button>+</Button>
                            <p className="text-[var(--custom-brown)]">Calculate new plan</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
        </div>
    )
}