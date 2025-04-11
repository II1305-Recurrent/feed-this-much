"use client"

import React, { useState, useEffect } from 'react';

function DisplayPlan() {

    const planID = 0; // This should come from previous selection by the user

    const base_url = 'http://localhost:8000'

    function getCookie(name) {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(name + '='))
            ?.split('=')[1];
        return cookieValue ?? null;
    }

    // State to store fetched data
    const [data, setData] = useState(null);

    // Effect to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures the effect runs once on mount

    // Function to fetch data
    const fetchData = async () => {
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
                console.log('Data got successfully', result);
                setData(result); // Update the state with the fetched data
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (err) {
            console.error('Request failed', err);
        }
    };

    // Render component
    return (
        <div>
            {data ? (
                // Display the fetched data
                <div>
                    <p>PetName needs X KJ of energy every day</p>
                    <p>This is X grams of {data[planID].food_name}.</p>
                    <p>Give PetName X servingtype of {data[planID].food_name} a day.</p>
                </div>
            ) : (
                // Display a loading message or other UI while data is being fetched
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DisplayPlan;