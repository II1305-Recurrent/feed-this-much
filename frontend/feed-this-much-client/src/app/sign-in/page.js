"use client"

import Image from "next/image";
import styles from "@/app/page.module.css";
import { Button } from "@/components/ui/button";
import { getRequest, postRequest } from "@/utils/fetchApi";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Sign_in_page() {
    const router = useRouter();

    let email = "";
    let password = "";
    let username = "";
    let first_name = "";

    function setPassword(data) {
        password = data;
    }

    function setEmail(data) {
        email = data;
    }

    function setUsername(data) {
        username = data;
    }

    function setFirstName(data) {
        first_name = data;
    }

    function resetData() {
        email = "";
        password = "";
        username = "";
        first_name = "";
    }

    async function register() {
        const data = { username, email, password, first_name };
        // get csrf token
        await getRequest({ path: '/api/register/' });

        // register
        await postRequest({ path: '/api/register/', body: data });
    }

    async function login() {
        const data = { username, password };

        // get csrf
        await getRequest({ path: '/api/login/' });
        // proceed with login
        const response = await postRequest({ path: '/api/login/', body: data });
        if (response.ok) {
            router.push('/home');
        }
    }

    return (
        <div style={{ padding: "5%" }}>

            <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
                Sign in
            </h1>

            <div className="flex justify-center min-h-screen">
                <Tabs defaultValue="sign-in" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2 bg-[var(--custom-pink)]">
                        <TabsTrigger value="sign-in" onClick={resetData}>Sign-in</TabsTrigger>
                        <TabsTrigger value="sign-up" onClick={resetData}>Sign-up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-in">
                        <div>
                            <p className="text-xs leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                                Welcome back! Sign in to view your pet details.
                            </p>
                        </div>
                        <Card className="bg-transparent shadow-none border-none">
                            <CardContent className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                                    <Label htmlFor="sign-in-email">Email</Label>
                                    <Input className="bg-white text-black" id="sign-in-email" type="email" placeholder="Enter your email address" onChange={(e) => { setEmail(e.target.value); setUsername(e.target.value) }} />
                                </div>
                                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                                    <Label htmlFor="password"> Password</Label>
                                    <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-left mt-1">
                                    <button className="text-sm text-blue-600 hover:underline">
                                        Forgot password?
                                    </button>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex justify-center w-full mt-6">
                                    <Button onClick={login} className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs">
                                        Sign-in
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sign-up">
                        <div>
                            <p className="text-xs leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                                Hi! Please create an account to get started.
                            </p>
                        </div>
                        <Card className="bg-transparent shadow-none border-none">
                            <CardContent className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" type="name" placeholder="Enter what you want us to call you" onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email address" onChange={(e) => { setEmail(e.target.value); setUsername(e.target.value) }} />
                                </div>
                                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                                    <Label htmlFor="repeat_password">Repeat Password</Label>
                                    <Input id="repeat_password" type="password" placeholder="Re-enter your password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex justify-center w-full mt-6">
                                    <Button onClick={register} className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs">
                                        Sign-up
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

            </div>

        </div>
    );
}