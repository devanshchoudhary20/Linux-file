'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from "@/fireabase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface UserContextType {
    user: User | null;
    loading: boolean;
    placeid : number;
    setPlaceid : (placeid: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [placeid, setPlaceid] = useState(1);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setLoading(true);
            if (authUser) {
                setUser(authUser);
                await storeUserData(authUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const storeUserData = async (authUser: User) => {
        if (authUser) {
            const userDocRef = doc(db, "users", authUser.uid);
            const user = {
                uid: authUser.uid,
                email: authUser.email,
                displayName: authUser.displayName,
                photoURL: authUser.photoURL,
                emailVerified: authUser.emailVerified,
                creationTime: authUser.metadata.creationTime,
                lastSignInTime: authUser.metadata.lastSignInTime,
                phoneNumber: authUser.phoneNumber,
            };
            await setDoc(userDocRef, user, { merge: true });
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, placeid, setPlaceid }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};