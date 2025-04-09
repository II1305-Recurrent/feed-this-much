"use client";

import {
  Cloud,
  CreditCard,
  Github,
  Home,
  Info,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useState } from "react";
import Image from "next/image";


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="menu-wrapper" style={{ padding: "5%" }}>
        <div className="hamburger-container">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hamburger">☰</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent alignOffset={8} align="start" className="w-30 bg-[var(--custom-beige)] ">
      
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Home />
                  <span>Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Info />
                  <span>About us</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail />
                  <span>Contact us</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
            </DropdownMenuContent>
          </DropdownMenu>
          {open && (
            <div className="dropdown">
              <a href="/"><span></span> Home</a>
              <a href="/about"><span></span> About us</a>
              <a href="/contact"><span></span> Contact us</a>
            </div>
          )}

<DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="profile">☰</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent alignOffset={8} align="end" className="w-30 bg-[var(--custom-beige)]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel> 
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Setting</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Image
          src="/logo_feedthismuch.png"
          alt="Feed This Much logo"
          width={180}
          height={100}
          className="logo"
        />
      </div>
    </header>
  );
}
