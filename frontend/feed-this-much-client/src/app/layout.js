/*import Image from "next/image"; 
import { useState } from "react";
import logo from "@/../../../docs/assets/img/logo_feedthismuch.png";
import styles from "./page.module.css";*/
import Header from "./Header";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModelProvider } from "./Model";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Feed this much",
    description: "How much to feed your pets?",
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ModelProvider>
                    <Header />
                    <main>{children}</main>
                    <Toaster />
                </ModelProvider>
            </body>
        </html>
    );
}
