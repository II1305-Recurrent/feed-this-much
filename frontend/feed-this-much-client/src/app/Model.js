"use client"

import { createContext, useContext, useState } from "react";

const ModelContext = createContext();

export function ModelProvider({ children }) {
    const [planIndex, setPlanIndex] = useState(0);
    const getIndex = () => {
        console.log(planIndex); // For logging purposes
        return planIndex;
    };
    const setIndex = (value) => setPlanIndex(value)

    const [cat, setCat] = useState({
        name: "",
        dob: "",
        current_weight: "",
        species: "cat",
        neutered: undefined,
        weight_unit: undefined,
        condition_score: "3",
        activity_level: undefined,
    });
    const setCatFields = ({ fieldName, value }) => setCat((prev) => ({ ...prev, [fieldName]: value }))

    const [dog, setDog] = useState({
        name: "",
        dob: "",
        current_weight: "",
        expected_weight: "",
        species: "dog",
        neutered: undefined,
        weight_unit: undefined,
        condition_score: "3",
        activity_level: undefined,
    })
    const setDogFields = ({ fieldName, value }) => setDog((prev) => ({ ...prev, [fieldName]: value }))
    return (
        <ModelContext.Provider value={{ planIndex, getIndex, setIndex, cat, setCatFields, dog, setDogFields }}>
            {children}
        </ModelContext.Provider>
    );
}

export const useModel = () => useContext(ModelContext);
