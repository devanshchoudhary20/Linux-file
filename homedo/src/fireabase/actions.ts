// firebase Auth error Handling :

import {arrayUnion, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {placesCollection} from "@/fireabase/FirebaseConfig";

export const handleFirebaseAuthError = (error : any) => {
    let errorMessage = '';
    // debugger
    switch (error.code) {
        case 'auth/email-already-in-use':
            errorMessage = 'Email is already in use. Please use a different email or log in.';
            break;
        case 'auth/invalid-email':
            errorMessage = 'Invalid email address. Please enter a valid email.';
            break;
        case 'auth/operation-not-allowed':
            errorMessage = 'Email/password accounts are not enabled. Please contact support.';
            break;
        case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please enter a stronger password.';
            break;
        case 'auth/user-disabled':
            errorMessage = 'User account is disabled. Please contact support.';
            break;
        case 'auth/user-not-found':
            errorMessage = 'No user found with this email. Please sign up.';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again or reset your password.';
            break;
        case 'auth/invalid-credential':
            errorMessage = 'The credential is invalid or has expired. Please check email/password again.';
            break;
        default:
            errorMessage = 'An unknown error occurred. Please try again.';
    }

    return errorMessage;
};

//save to Places

export const addPlaceWithIncrementingId = async (userId: string, placeName: string) => {
    if (!userId) {
        throw new Error("User ID is required to save places.");
    }

    const userPlacesDocRef = doc(placesCollection, userId);

    try {
        // Get the current user's places document
        const userPlacesDoc = await getDoc(userPlacesDocRef);

        let places = [];
        let nextPlaceId = 1;

        if (userPlacesDoc.exists()) {
            places = userPlacesDoc.data().places || [];
            // Find the highest existing placeId
            if (places.length > 0) {
                nextPlaceId = Math.max(...places.map(place => place.placeid)) + 1;
            }
        }

        // Create the new place object
        const newPlace = {
            placeid: nextPlaceId,
            name: placeName
        };

        if (userPlacesDoc.exists()) {
            // If the document exists, update it
            await updateDoc(userPlacesDocRef, {
                places: arrayUnion(newPlace)
            });
        } else {
            // If the document doesn't exist, create it
            await setDoc(userPlacesDocRef, {
                places: [newPlace]
            });
        }

        console.log(`Place "${placeName}" saved successfully with ID: ${nextPlaceId}`);
    } catch (error) {
        console.error("Error saving place data: ", error);
    }
};