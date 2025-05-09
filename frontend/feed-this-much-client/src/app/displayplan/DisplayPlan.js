"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { getRequest, postRequest } from "@/utils/fetchApi";
import { useSearchParams } from 'next/navigation'; // used for searching just one plan

function DisplayPlan() {

    // State to store fetched data
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set the plan id from the search params
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('id');

    useEffect(() => {
        async function fetchData() {
            try {
                const planRes = await getRequest({ path: "/api/get-plans/" });

                if (planRes.ok) {
                    setPlans(Array.isArray(planRes.payload) ? planRes.payload : []);
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
    'food_name', 'food_serving_type', 
    'daily_energy_needs', 'daily_food_weight', 
    'daily_food_weight_unit', 'daily_servings_amount'] */

    // find only the selected plan
    const plan = plans.find(p => String(p.id) === selectedId); // matched by id string

    // check if selected plan has one or more foods
    let multifoodplan = false; // set to false by default
    if (plan) {
        // If more than one food, set multifoodplan to true

    }

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
                ) : multifoodplan ? (
                    <div>
                        <h2 className="scroll-m-20 text-1xl text-[var(--custom-blue)] font-bold tracking-tight lg:text-1xl !mb-3">
                            {plan.plan_title}
                        </h2>
                        <p>
                            {plan.pet_name} needs {plan.daily_energy_needs.toFixed(2)} KJ / {(plan.daily_energy_needs / 4.184).toFixed(2)} kcal of energy every day.
                        </p>
                        <p>
                            This is {plan.daily_food_weight.toFixed(2)} {plan.daily_food_weight_unit} of {plan.food_name}.
                        </p>
                        <p>
                            Give {plan.pet_name} {plan.daily_servings_amount.toFixed(1)} {plan.food_serving_type}s of {plan.food_name} a day.
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2 className="scroll-m-20 text-1xl text-[var(--custom-blue)] font-bold tracking-tight lg:text-1xl !mb-3">
                            {plan.plan_title}
                        </h2>
                        <p>
                            {plan.pet_name} needs {plan.daily_energy_needs.toFixed(2)} KJ / {(plan.daily_energy_needs / 4.184).toFixed(2)} kcal of energy every day.
                        </p>
                        <p>
                            This is {plan.daily_food_weight.toFixed(2)} {plan.daily_food_weight_unit} of {plan.food_name}.
                        </p>
                        <p>
                            Give {plan.pet_name} {plan.daily_servings_amount.toFixed(1)} {plan.food_serving_type}s of {plan.food_name} a day.
                        </p>
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
