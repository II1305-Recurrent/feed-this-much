/*import Image from "next/image"; 
import { useState } from "react";
import logo from "@/../../../docs/assets/img/logo_feedthismuch.png";
import styles from "./page.module.css";*/
import Header from "./Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

<<<<<<< HEAD
export default function RootLayout({ children }) {
    return(
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Feed This Much logo"
              width={180}
              height={100}
              className={styles.logo}
            />
          </div>
          
        </header>

        {children}
        </body>
      </html>
    )

}
=======

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    );
  }
>>>>>>> 1ab0647 (added burger menu and new file for it)
