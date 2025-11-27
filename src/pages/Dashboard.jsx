import { useEffect, useState } from "react";
import { listenChargerData } from "../firebase/database";
import StatusPanel from "../components/StatusPanel";
import ControlPanel from "../components/ControlPanel";


export default function Dashboard() {
    const [gunData, setGunData] = useState(null);

    useEffect(() => {
        listenChargerData((data) => {
            setGunData(data);
            console.log("Realtime Data:", data);
        });
    }, []);

    return (
        <div className="text-white p-5">
            <h1 className="text-2xl font-bold mb-5">SlotSure AI Dashboard</h1>
            <StatusPanel data={gunData} />
            <ControlPanel stationId="station01" gunId="gun01" />
        </div>
    );
}
