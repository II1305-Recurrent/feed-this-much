"use client"

import { getPlanIndex } from "../Model"
import { useModel } from "../Model";

export default function Plan(){
    const plan = {id:0, title:"Plan 1 for Mac", pet:{id:0, name:"Mac"}, foods:[{id:0, name:"Fancy Chow", amount:2, servingType:"scoop"}, {id:1, name:"Nice food", amount:1, servingType:"tin"}]}
    const { planIndex } = useModel();
    return(
        <div style={{paddingBottom: "5%", paddingLeft: "5%", paddingRight:"5%"}}>
            <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-4">
                {plan.title}
            </h1>
            {plan.foods.map((item) => 
                <div key={item.id} className="flex justify-between">
                    <p className="text-[var(--custom-brown)]">{item.name}</p>
                    <div className="flex gap-x-1"><p className="text-[var(--custom-brown)]">{item.amount}</p>
                    <p className="text-[var(--custom-brown)]">{item.servingType}</p></div>
                </div>   
            )}
            <div>

            </div>
        </div>
    )
}