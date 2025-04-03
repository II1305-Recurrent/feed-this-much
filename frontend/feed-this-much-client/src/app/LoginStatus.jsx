"use client"

import { useState } from "react";
import NotSignedIn from "./page"
import Home from "./home"

export default function ClientLoginStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    const handleLogin = () => {
      setIsLoggedIn(true); // Simulate login (you could also check credentials here)
    };
  
    return (
      <div>
        {isLoggedIn ? (
          <Home />
        ) : (
          <NotSignedIn />
        )}
      </div>
    );
  }