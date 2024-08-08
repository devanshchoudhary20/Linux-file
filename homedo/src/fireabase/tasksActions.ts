import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs } from "firebase/firestore";
import { tasksCollection } from "./FirebaseConfig";
import { query, where } from "firebase/firestore";

export const addTask = async (userId:string, placeId:number, taskData:any) => {
  try {
    const docRef = await addDoc(tasksCollection, {
      userId,
      placeId,
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isComplete: false,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const updateTask = async (taskId:string, taskData:any) => {
  try {
    const taskRef = doc(tasksCollection, taskId);
    await updateDoc(taskRef, {
      ...taskData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
};

export const deleteTask = async (taskId:string) => {
  try {
    const taskRef = doc(tasksCollection, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};


export const getAllTasks = async (userId: string, placeId: number) => {
  const tasksQuery = query(tasksCollection,
    where('userId', '==', userId),
    where('placeId', '==', placeId)
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  return tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}