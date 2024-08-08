// 'use client'
// import {auth, db} from "@/fireabase/FirebaseConfig";
// import { onAuthStateChanged, User} from "firebase/auth";
// import {doc, setDoc} from "firebase/firestore";

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         const uid = user.uid;
//         await storeUserData(user)
//         console.log(user);
//     } else {
//         console.log("Signed out")
//     }
// });


// const storeUserData = async (authUser: User) => {
//     if (authUser) {
//         const userDocRef = doc(db, "users", authUser.uid);
//         const user = {
//             uid: authUser.uid,
//             email: authUser.email,
//             displayName: authUser.displayName,
//             photoURL: authUser.photoURL,
//             emailVerified: authUser.emailVerified,
//             creationTime: authUser.metadata.creationTime,
//             lastSignInTime: authUser.metadata.lastSignInTime,
//             phoneNumber: authUser.phoneNumber,
//         };
//         await setDoc(userDocRef, user, { merge: true });
//     }
// };