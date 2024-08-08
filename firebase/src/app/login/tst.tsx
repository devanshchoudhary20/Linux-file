import {auth, db, app} from '@/app/Firebase/FirebaseConfig'
import {collection, setDoc, doc, getDoc} from "@firebase/firestore";

const userCollection = collection(db,'users');

const addUser = async (userid: string | undefined, userData: any) => {
    await setDoc(doc(userCollection,userid),userData);
    console.log('user Added with userid :', userid )
};

const getUser = async (userId: string) => {
    const userDoc = await getDoc(doc(userCollection, userId));
    return userDoc.exists() ? userDoc.data() : null;
};


const getPlace = async (userId: string) => {
    return collection(db, 'places', userId);
};

const getTasks = async (userId: string, placeId: string) => {
    return collection(db, 'tasks', userId, 'placeId', placeId);
}