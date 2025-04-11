"use client"

import React, { useState, useEffect } from 'react';

//import sampleData from "./exampleplandata.json";

function DisplayPlan() {

    // State to store fetched data
    const [data, setData] = useState(null);

    // Effect to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures the effect runs once on mount

    // Function to fetch data
    const fetchData = async () => {
        try {
            // Make a GET request using the Fetch API
            const response = await fetch('https://api.feedthismuch.com/api/get-pets/');

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the JSON data from the response
            const result = await response.json();

            // Update the state with the fetched data
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    // Render component
    // Render the component
    return (
        <div>
            {data ? (
                // Display the fetched data
                <div>
                    <p>{JSON.stringify(data)}</p>
                    <p>PetName needs X KJ of energy every day</p>
                    <p>This is X grams of FoodName.</p>
                    <p>Give PetName X servingtype of FoodName a day.</p>
                </div>
            ) : (
                // Display a loading message or other UI while data is being fetched
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DisplayPlan;