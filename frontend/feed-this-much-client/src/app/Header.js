"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/../../../docs/assets/img/logo_feedthismuch.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="menu-wrapper">
        <div className="hamburger-container">
          <button onClick={() => setOpen(!open)} className="hamburger">
            ☰
          </button>

          {open && (
            <div className="dropdown">
              <a href="/"><span></span> Home</a>
              <a href="/about"><span></span> About us</a>
              <a href="/contact"><span></span> Contact us</a>
            </div>
          )}
        </div>

        <Image
          src={logo}
          alt="Feed This Much logo"
          width={180}
          height={100}
          className="logo"
        />
      </div>
    </header>
  );
}
