"use client"

import { getRequest } from "@/utils/fetchApi"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Account() {
    const router = useRouter();
    const [user, setUser] = useState([]);
    async function getUser() {
        const response = await getRequest({ path: '/api/get-user/' });
        if (response.ok) {
            console.log(response.payload)
            setUser(response.payload)
        }

    }

    useEffect(() => {
        getUser()
        console.log(user);
    }, []);
    useEffect(() => {
        if (user) {
            console.log(user);
            router.replace(router.asPath);
        }
    }, [user]);
    return (
        <div className="page">
            <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Account
            </h1>
            <div className="flex flex-row justify-between !mb-1"><p className="font-bold text-[var(--custom-brown)]">Display name: </p><p className="text-[var(--custom-brown)]">{user.first_name}</p></div>
            <div className="flex flex-row justify-between !mb-1"><p className="font-bold text-[var(--custom-brown)]">Email: </p><p className="text-[var(--custom-brown)]">{user.email}</p></div>
        </div>
    )
}