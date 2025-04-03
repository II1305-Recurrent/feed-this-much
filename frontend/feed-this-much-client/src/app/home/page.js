import Image from "next/image"; 
import styles from "@/app/page.module.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

export default function Home(){
    const pets = [{id:1, title: "Mac"}]; //will need to be fetched from API
    const foods = [{id:1, title: "Fancy Chow"}];
    const plans = [{id:1, title: "Plan 1 for Mac"}];
    return(
        <div style={{padding: "5%"}}>
            <Image 
                src={`logo_feedthismuch.png`}
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
                            <div className="inline-flex items-center gap-2">
                                <Button>+</Button>
                                <p className="text-[var(--custom-brown)]">Add pet</p>
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
                            <div className="inline-flex items-center gap-2">
                                <Button>+</Button>
                                <p className="text-[var(--custom-brown)]">Add food</p>
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
                            <div className="inline-flex items-center gap-2">
                                <Button>+</Button>
                                <p className="text-[var(--custom-brown)]">Calculate new plan</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
        </div>
    )
}
