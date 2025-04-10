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

import { redirect } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
import Link from 'next/link'

export default function Header() {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(false)
    }

    const [accountOpen, setAccountOpen] = useState(false);
    const handleAccountClick = () => {
        setAccountOpen(false)
    }


    return (
        <header className="navbar">
            <div className="menu-wrapper" style={{ padding: "5%" }}>
                <div className="hamburger-container">
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="hamburger">☰</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent alignOffset={8} align="start" className="w-30 bg-[var(--custom-beige)] ">

                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={handleClick}>
                                    <Home />
                                    <Link href="/">
                                        Home
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleClick}>
                                    <Info />
                                    <Link href="/about">
                                        About us
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleClick}>
                                    <Mail />
                                    <Link href="/contact">
                                        Contact us
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu accountOpen={open} onOpenChange={setAccountOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="profile">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent alignOffset={8} align="end" className="w-30 bg-[var(--custom-beige)]">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/account"
                                        onClick={() => setAccountOpen(false)}>
                                        <User />
                                        <span>Account</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/settings"
                                        onClick={() => setAccountOpen(false)}>
                                        <Settings />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/"
                                        onClick={() => setAccountOpen(false)}>
                                        <LogOut />
                                        <span>Log out</span>
                                    </Link>
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
