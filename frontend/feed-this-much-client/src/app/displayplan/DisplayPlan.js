"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { getRequest, postRequest } from "@/utils/fetchApi";
import { useSearchParams } from 'next/navigation'; // used for searching just one plan

function DisplayPlan() {

    // State to store fetched data
    const [plan, setPlan] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set the plan id from the search params
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('id');
    let apiPath = "/api/get-combined-plans-byid/" + selectedId + "/";

    useEffect(() => {
        async function fetchData() {
            try {
                const planRes = await getRequest({ path: apiPath });

                if (planRes.ok) {
                    setPlan(planRes.payload); // Now uses the returned object directly - used to be an array!
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

    /* Plan Fields for Reference 
    ['user', 'pet', 'plan_title', 
    'pet_name',
    'food_name', 'food_serving_type', 'daily_energy_allowance', 'daily_food_weight', 
    'daily_food_weight_unit', 'daily_servings_amount'] */

    console.log("DEBUG PLAN OBJECT", plan); // debug

    // Silly function to change packet image because I got bored waiting for the plans api
    // Dynamically set image based on packet_type
    let imageToDisplay = "/foodbowl01.png"; // Default image
    const altTextToDisplay = "Food Packet Image"

    if (plan) {
        const packetType = plan.food_serving_type;
        if (packetType === "scoop") {
            imageToDisplay = "/packet_scoop01.png";
        } else if (packetType === "carton") {
            imageToDisplay = "/packet_carton01.png";
        } else if (packetType === "tin") {
            imageToDisplay = "/packet_tin01.png";
        } else if (packetType === "sachet") {
            imageToDisplay = "/packet_sachet01.png";
        }
    }

    // Render component
    return (
        <div className="page">
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : !plan ? (
                    <p>No plan data found!</p>
                ) : (
                    <div>
                        <h2 className="scroll-m-20 text-1xl text-[var(--custom-blue)] font-bold tracking-tight lg:text-1xl !mb-3">
                            {plan.plan_title}
                        </h2>
                        <p>
                            {plan.pet_name} needs {plan.daily_energy_allowance.toFixed(2)} KJ / {(plan.daily_energy_allowance / 4.184).toFixed(2)} kcal of energy every day.
                        </p>
                        {plan.plans.map((food, idx) => (
                            <div key={food.userplan_id}>
                                <h3 className="text-md font-semibold">Food {idx + 1}: {food.food_name}</h3>
                                <p>Give {food.daily_servings_amount.toFixed(1)} {food.food_serving_type}(s) per day.</p>
                                <p>This is {food.daily_food_weight.toFixed(2)} {food.daily_food_weight_unit} per day.</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <Image
                    src={imageToDisplay}
                    alt={altTextToDisplay}
                    width={150}
                    height={150}>
                </Image>
            </div>
        </div>
    );
}

export default DisplayPlan;
