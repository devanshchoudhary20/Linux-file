import { auth } from "@/app/Firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user);
        // ...
    } else {
        console.log("Signed out")
    }
});