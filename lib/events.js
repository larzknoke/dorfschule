import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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
