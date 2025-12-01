import { ref, onValue } from "firebase/database";
import { db } from "./config";

export const listenStations = (callback) => {
    const stationsRef = ref(db, "chargerStations");
    const unsubscribe = onValue(stationsRef, (snapshot) => {
        callback(snapshot.val() || {});
    });
    return unsubscribe;
};
