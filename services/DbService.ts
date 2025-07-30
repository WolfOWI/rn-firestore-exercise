// Firebase service
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

// Create new list item function
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

// Get all list items function (priority at the top)
export const getMyBucketList = async (): Promise<any[]> => {
  const items: any[] = [];

  const q = query(collection(db, "bucket_items"), orderBy("priority", "desc"));
  const querySnapshot = await getDocs(q);

  console.log(querySnapshot.docs);

  querySnapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
  });
  return items;
};

// Delete bucket item (returns true if success)
export const deleteBucketItem = async (itemId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "bucket_items", itemId));
    console.log("Document deleted with ID: ", itemId);
    return true;
  } catch (e) {
    console.error("Error deleting document: ", e);
    return false;
  }
};

// Update bucket item
export const updateBucketItem = async (itemId: string, data: any): Promise<boolean> => {
  try {
    await updateDoc(doc(db, "bucket_items", itemId), data);
    console.log("Document updated with ID: ", itemId);
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
};
