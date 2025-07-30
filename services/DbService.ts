// Firebase service
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "../firebase";

// TODO: Create new list item function

export const createNewBucketItem = async (items: any): Promise<boolean> => {
  try {
    const docRef = await addDoc(collection(db, "bucket_items"), items);
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

// TODO: Get all list items function
