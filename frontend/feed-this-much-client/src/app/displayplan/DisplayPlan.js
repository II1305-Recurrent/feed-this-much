"use client"

import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from "@/utils/fetchApi";

function DisplayPlan() {

    // State to store fetched data
    const [planData, setPlanData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const planRes = await getRequest({ path: "/api/get-plans/" });

                if (planRes.ok) {
                    setPlanData(Array.isArray(planRes.payload) ? planRes.payload : []);
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

    /*
    // State to store fetched data
    const [foodData, setFoodData] = useState(null);
    const [petData, setPetData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const foodRes = await getRequest({ path: "/api/get-foods/" });
                const petRes = await getRequest({ path: "/api/get-pets/" });

                if (foodRes.ok) {
                    setFoodData(Array.isArray(foodRes.payload) ? foodRes.payload : []);
                }

                if (petRes.ok) {
                    setPetData(Array.isArray(petRes.payload) ? petRes.payload : []);
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

    */

    /* Plan fields = 
    ['user', 'pet', 'plan_title', 
    'food_name', 'food_serving_type', 
    'daily_energy_needs', 'daily_food_weight', 
    'daily_food_weight_unit', 'daily_servings_amount'] */

    // For testing purposes, using a fixed ID
    const planID = 0;
    const foodID = 1;

    // Silly function to change packet image because I got bored waiting for the plans api
    // Dynamically set image based on packet_type
    let imageToDisplay = "/foodbowl01.png"; // Default image
    const altTextToDisplay = "Food Packet Image"

    if (planData && planData[planID]) {
        const packetType = planData[planID].food_serving_type;
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
                ) : !planData?.[planID] ? (
                    <p>No plan data to display!</p>
                ) : (
                    <div>
                        <p>
                            {planData[planID].pet} needs {planData[planID].daily_energy_needs} KJ of energy every day
                        </p>
                        <p>
                            This is {planData[planID].daily_food_weight} {planData[planID].daily_food_weight_unit} of {planData[planID].food_name}.
                        </p>
                        <p>
                            Give {planData[planID].pet} {planData[planID].daily_servings_amount} {planData[planID].food_serving_type}s of {planData[planID].food_name} a day.
                        </p>
                    </div>
                )}
            </div>
            <img src={imageToDisplay} width={150} height={150} alt={altTextToDisplay} />
        </div>
    );
}

export default DisplayPlan;