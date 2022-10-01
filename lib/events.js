import { db } from "../lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const dbEvents = collection(db, "events");

export const getEvents = async () => {
  const data = [];
  try {
    const response = await getDocs(dbEvents);
    response.docs.map((item) => {
      data.push({ ...item.data(), id: item.id });
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteEvent = async (id) => {
  try {
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};
