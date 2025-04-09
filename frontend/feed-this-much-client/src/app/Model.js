"use client"

import { createContext, useContext, useState } from "react";

const ModelContext = createContext();

export function ModelProvider({children}){
    const [planIndex, setPlanIndex] = useState(0);
    const getIndex = () => {
        console.log(planIndex); // For logging purposes
        return planIndex;
    };
    const setIndex = (value) => setPlanIndex(value)
    return (
        <ModelContext.Provider value={{ planIndex, getIndex, setIndex }}>
          {children}
        </ModelContext.Provider>
    );
}

export const useModel = () => useContext(ModelContext);
