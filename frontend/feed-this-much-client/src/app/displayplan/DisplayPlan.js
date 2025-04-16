"use client"

import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from "@/utils/fetchApi";

function DisplayPlan() {

    // State to store fetched data
    const [foodData, setFoodData] = useState(null);
    const [petData, setPetData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const foodRes = await getRequest({ path: "/api/get-foods/" });
                const petRes = await getRequest({ path: "/api/get-pets/" });

                if (foodRes && foodRes.payload) {
                    setFoodData(foodRes.payload);
                } else {
                    throw new Error("Failed to fetch food data.");
                }

                if (petRes && petRes.payload) {
                    setPetData(petRes.payload);
                } else {
                    throw new Error("Failed to fetch pet data.");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to fetch data.");
            }
        }

        fetchData();
    }, []);

    if (error) return <p>{error}</p>;
    if (!foodData || !petData) return <p>Loading...</p>;

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
                {petData && foodData ? (
                    // Display the fetched data
                    <div>
                        <p>{petData[planID].name} needs X KJ of energy every day</p>
                        <p>This is X grams of {foodData[foodID].food_name}.</p>
                        <p>Give {petData[planID].name} X {foodData[foodID].packet_type}s of {foodData[foodID].food_name} a day.</p>
                    </div>
                ) : (
                    // Display a loading message or other UI while data is being fetched
                    <p>Loading...</p>
                )}
            </div>
            <img src={imageToDisplay} alt={altTextToDisplay} />
        </div>
    );
}

export default DisplayPlan;