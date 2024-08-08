import {FormEvent, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db, userCollection} from "@/fireabase/FirebaseConfig";
import {addDoc, setDoc, doc} from "firebase/firestore";
import {useRouter} from "next/navigation";
import {handleFirebaseAuthError} from "@/fireabase/actions";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed up:', user.uid);

            try {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    createdAt: new Date(),

                });
                console.log('User document added to Firestore with UID as document ID');
                // Here you can add code to redirect the user or show a success message
            } catch (err) {
                console.error('Error adding user document:', err);
                alert('Account created, but there was an error saving additional info. Please try again later.');
            }
            
            if (auth.currentUser) {
                Router.push('/home');
            } else {
                Router.push('/login');
            }
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = handleFirebaseAuthError(error);
                console.error('Error signing up:', error.message);
                alert(errorMessage);
            } else {
                console.error('Unknown error during signup');
                alert('An unknown error occurred. Please try again.');
            }
        }
    }

    return(
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}