"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequest, putRequest } from "@/utils/fetchApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Settings() {
    const router = useRouter();
    const [user, setUser] = useState([]);
    const [newName, setNewName] = useState([]);
    const [editName, setEditName] = useState(false);
    const [newMail, setNewMail] = useState([]);
    const [editMail, setEditMail] = useState(false);
    async function getUser() {
        const response = await getRequest({ path: '/api/get-user/' });
        if (response.ok) {
            //console.log(response.payload)
            setUser(response.payload)
        }

    }
    useEffect(() => {
        getUser()
        //console.log(user);
    }, []);
    useEffect(() => {
        if (user) {
            //console.log(user);
            router.refresh();
        }
    }, [user]);
    async function changeName() {
        const response = await putRequest({ path: '/api/update-user-details/', body: { "first_name": newName } });
        if (response.ok) {
            getUser()
        }

    }
    async function changeMail() {
        const response = await putRequest({ path: '/api/update-user-details/', body: { "email": newMail } });
        if (response.ok) {
            getUser()
        }
        else if (response.status === 400) {
            const data = response.payload;
            if (
                data.username &&
                data.username.includes("A user with that username already exists.")
            ) {
                toast.error("An account with this email already exists")
                console.log("already exxists")
            }
        }
    }
    return (
        <div className="page">
            <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Settings
            </h1>
            <div className="flex flex-row items-center justify-between max-w-sm !pb-2">
                <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                    display name: {user.first_name}
                </p>
                <Button variant="plus" onClick={() => { setEditName(true) }}><p className="text-[var(--custom-brown)] !pl-2 !pr-2">Change my display name</p></Button>
            </div>
            {editName ?
                <div className="flex flex-row items-center justify-between max-w-sm !pb-6">
                    <Input placeholder="Enter your new display name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <Button className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg" onClick={() => { changeName(); setEditName(false); setNewName("") }}>Submit</Button>
                </div>
                : null}
            <div className="flex flex-row items-center justify-between max-w-sm !pb-2">
                <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                    email: {user.email}
                </p>
                <Button variant="plus" onClick={() => { setEditMail(true) }}><p className="text-[var(--custom-brown)] !pl-2 !pr-2">Change my email address</p></Button>
            </div>
            {editMail ?
                <div className="flex flex-row items-center justify-between max-w-sm !pb-6">
                    <Input placeholder="Enter your new email address" value={newMail} onChange={(e) => setNewMail(e.target.value)} />
                    <Button className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg" onClick={() => { changeMail(); setEditMail(false); setNewMail("") }}>Submit</Button>
                </div>
                : null}
        </div>
    )
}
