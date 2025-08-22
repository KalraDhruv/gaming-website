"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest(){
    const router= useRouter()
    const [otp, setOtp] = useState("")
    const [emailPending, startEmailTransition] = useTransition();
    const params = useSearchParams()
    const email = params.get('email') as string;
    const isOtpCompleted = otp.length === 6;
    function verifyOtp() {
        startEmailTransition(async () =>{
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions:{
                    onSuccess: () =>{
                        toast.success("Email Verified") 
                        router.push("/")
                    },
                    onError: () => {
                        toast.success("Error verifying Email/OTP")
                    }
                }
            })
        })

    }

    return(
        <Card className="w-full mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Please check your email</CardTitle>
                <CardDescription>
                    We have sent a verification email code to your email adddress.
                    Please open the email and paste the code below.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="flex flex-col items-center space-y-2 ">
                    <InputOTP value={otp} onChange={(value)=> setOtp(value)}maxLength={6} className="gap-2">
                    <InputOTPGroup>
                        <InputOTPSlot index={0}/>
                        <InputOTPSlot index={1}/>
                        <InputOTPSlot index={2}/>
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot index={3}/>
                        <InputOTPSlot index={4}/>
                        <InputOTPSlot index={5}/>
                    </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email.</p>
                </div>
                <Button onClick={verifyOtp} disabled={emailPending || !isOtpCompleted} className="w-full">
                    {emailPending? (
                        <>
                        <Loader2 className="size-4 animate-spin"/>
                        <span>Loading...</span>
                        </>
                    ):
                    (
                        <>
                        Verify Request
                        </>
                    )}
                </Button>
            </CardContent>
                
        </Card>
    )
}