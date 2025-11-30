import { ref, onValue } from "firebase/database";
import { db } from "./config";

export const listenSlots = (callback) => {
    const slotsRef = ref(db, "/");
    onValue(slotsRef, (snapshot) => {
        callback(snapshot.val());
    });
};
