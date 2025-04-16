"use client"

import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from "@/utils/fetchApi";

function DisplayPlan() {

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

    // For testing purposes, using a fixed ID
    const planID = 0;
    const foodID = 1;

    // Silly function to change packet image because I got bored waiting for the plans api
    // Dynamically set image based on packet_type
    let imageToDisplay = "/foodbowl01.png"; // Default image
    const altTextToDisplay = "Food Packet Image"

    if (foodData && foodData[foodID]) {
        const packetType = foodData[foodID].packet_type;
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
                ) : !foodData?.[foodID] || !petData?.[planID] ? (
                    <p>No pet or food data to display!</p>
                ) : (
                    <div>
                        <p>{petData[planID].name} needs 600 KJ of energy every day</p>
                        <p>This is 350 grams of {foodData[foodID].food_name}.</p>
                        <p>
                            Give {petData[planID].name} 2 {foodData[foodID].packet_type}s of {foodData[foodID].food_name} a day.
                        </p>
                    </div>
                )}
            </div>
            <img src={imageToDisplay} width={150} height={150} alt={altTextToDisplay} />
        </div>
    );
}

export default DisplayPlan;