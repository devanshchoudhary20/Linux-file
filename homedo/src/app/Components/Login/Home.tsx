'use client'

import Image from "next/image";
import Signup from "@/app/Components/Login/Signup";
import Login from "@/app/Components/Login/Login";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/fireabase/FirebaseConfig";


export default function Homepage() {

    const [isSignup, setIsSignup] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to home page
                router.push('/login');
            } else {
                // User is signed out
                console.log('Signed out');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleClick =() => {
        setIsSignup(!isSignup);
    }
    const handleLoginClick = () => {
        setIsSignup(!isSignup);
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 bg-blue-50 w-full">
                <div className="flex items-center justify-center top-2 ">
                    <Image
                        alt="Your Company"
                        src="/images/homedo.png"
                        className=""
                        width={50}
                        height={50}
                    />
                    <h2 className="text-lg font-bold">Homedo</h2>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-16">


                    <h1 className="my-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Organise Your Cleaning Routine </h1>
                    <Image
                        alt="Your Company"
                        src="/images/file.png"
                        className=""
                        width={400}
                        height={400}
                    />
                </div>
                {
                    isSignup && (
                        <>
                            <Signup/>
                            <div className="flex items-center justify-center mt-4 ">
                                Already Have an Account?
                                <button
                                    className="font-bold text-blue-500 hover:text-blue-800 ml-2"
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </button>
                            </div>
                        </>

                    )
                }
                {
                    !isSignup && (
                        <>
                            <Login/>
                            <div className="flex items-center justify-center mt-4 ">
                                Didn't Have an Account?
                                <button
                                    className="font-bold text-blue-500 hover:text-blue-800 ml-2"
                                    onClick={handleClick}
                                >
                                    SignUp
                                </button>
                            </div>
                        </>

                    )
                }


            </div>
        </>
    )
}
