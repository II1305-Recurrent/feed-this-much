"use client"

import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from "@/utils/fetchApi";

function DisplayPlan() {

    const planID = 0; // This should come from previous selection by the user
    const foodID = 1; // testing only

    // State to store fetched data
    const [food, setFood] = useState();
    const [pets, setPet] = useState();

    // Effect to fetch data when the component mounts
    useEffect(() => {
        fetchFoodData();
    }, []); // Empty dependency array ensures the effect runs once on mount

    // Effect to fetch data when the component mounts
    useEffect(() => {
        fetchPetData();
    }, []); // Empty dependency array ensures the effect runs once on mount


    // Function to fetch Food data
    const fetchFoodData = async () => {
        try {
            const resp = await getRequest({ path: '/api/get-food/' });

            if (response.ok) {
                setFood(resp.payload)
            }
        } catch (err) {
            console.error('Request failed', err);
        }
    };

    // Function to fetch Pet data
    const fetchPetData = async () => {
        try {
            const resp = await getRequest({ path: '/api/get-pet/' });

            if (response.ok) {
                setPet(resp.payload)
            }
        } catch (err) {
            console.error('Request failed', err);
        }
    };

    /*
    // Function to fetch Food data
    const fetchFoodData = async () => {
        try {
            const csrftoken = getCookie('csrftoken');
            const response = await fetch(base_url.concat('/api/get-foods/'), {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: "include",
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Food Data got successfully', result);
                setFood(result); // Update the state with the fetched data
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (err) {
            console.error('Request failed', err);
        }
    };
    */

    /*
    // Function to fetch Pet data
    const fetchPetData = async () => {
        try {
            const csrftoken = getCookie('csrftoken');
            const response = await fetch(base_url.concat('/api/get-pets/'), {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: "include",
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Pet Data got successfully', result);
                setPet(result); // Update the state with the fetched data
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (err) {
            console.error('Request failed', err);
        }
    };
    */

    // Silly function to change packet image because I got bored waiting for the plans api
    // Dynamically set image based on packet_type
    let imageToDisplay = "/foodbowl01.png"; // Default image
    const altTextToDisplay = "Food Packet Image"

    if (food && food[foodID]) {
        const packetType = food[foodID].packet_type;
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
                {pets && food ? (
                    // Display the fetched data
                    <div>
                        <p>{pets[planID].name} needs X KJ of energy every day</p>
                        <p>This is X grams of {food[foodID].food_name}.</p>
                        <p>Give {pets[planID].name} X {food[foodID].packet_type}s of {food[foodID].food_name} a day.</p>
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