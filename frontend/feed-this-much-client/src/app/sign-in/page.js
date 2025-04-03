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

export default function Home() {
  return (
    <div style={{padding: "5%"}}>
      <Image 
          src={logo}
          alt="" 
          width={180} 
          height={100.5} 
          className={styles.logo}
        />
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
        <Card>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
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
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

    </div>

    </div>
  );
}
