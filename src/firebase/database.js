import { ref, onValue } from "firebase/database";
import { db } from "./config";

export const listenChargerData = (callback) => {
    const gunRef = ref(db, "chargerStations/station01/guns/gun01");
    onValue(gunRef, (snapshot) => {
        callback(snapshot.val());
    });
};
