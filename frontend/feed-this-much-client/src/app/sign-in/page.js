import Image from "next/image"; 
import logo from "@/../../../docs/assets/img/logo_feedthismuch.png";
import styles from "@/app/page.module.css";
import { Button } from "@/components/ui/button";
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

export default function Sign_in_page() {
  return (
    <div style={{padding: "5%"}}>
      <h1 className="scroll-m-20 text-2xl  text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl">
      Sign in
      </h1>

    <div>
        <p className="text-xs leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4"> 
        Welcome back! Sign in to view your pet details.
        </p> 
    </div>
    
    <div>
    <Tabs defaultValue="sign-in" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">Sign-in</TabsTrigger>
        <TabsTrigger value="sign-up">Sign-up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card className="bg-transparent shadow-none border-none">
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                <Label htmlFor="sign-in-email">Email</Label>
                <Input className="bg-white text-black" id="sign-in-email" type="email" placeholder="Enter your email address"/>
                </div>
                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                <Label htmlFor="password"> Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
                </div>
                <div className="text-left mt-1">
                <button className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                </button>
                </div>
            </CardContent>
        <CardFooter>
                <div className="flex justify-center w-full mt-6">
                <Button className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs">
                    Sign-in 
                </Button>
                </div>
        </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card className="bg-transparent shadow-none border-none">
        <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="name" placeholder="Enter what you want us to call you" />
                </div>
                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
                </div>
                <div className="flex flex-col gap-2 text-[var(--custom-brown)]">
                <Label htmlFor="repeat_password">Repeat Password</Label>
                <Input id="repeat_password" type="password" placeholder="Re-enter your password" />
                </div>
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    </div>

    </div>
  );
}
