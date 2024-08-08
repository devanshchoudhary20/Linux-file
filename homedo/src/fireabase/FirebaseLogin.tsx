import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


const auth = getAuth();
let email = 'devanshchoudhary3324@gmail.com'
let password = 'ikawhdiw31'
const userCredentials = (async() =>{
     await createUserWithEmailAndPassword(auth,email,password)
});
console.log(userCredentials);