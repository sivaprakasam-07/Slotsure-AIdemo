import { ref, update } from "firebase/database";
import { db } from "../firebase/config";

export default function ControlPanel({ stationId, gunId }) {

    const gunRef = ref(db, `chargerStations/${stationId}/guns/${gunId}`);

    const handleStart = () => {
        update(gunRef, {
            "controls/start": true,
            "status": "charging"
        });
    };

    const handleStop = () => {
        update(gunRef, {
            "controls/stop": true,
            "status": "completed"
        });
    };

    const setMode = (mode) => {
        update(gunRef, {
            "mode": mode
        });
    };

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg mt-5">
            <h2 className="text-xl font-bold mb-3">Control Panel</h2>

            <button
                className="bg-green-600 px-4 py-2 rounded-lg mr-3"
                onClick={handleStart}
            >
                Start Charging
            </button>

            <button
                className="bg-red-600 px-4 py-2 rounded-lg"
                onClick={handleStop}
            >
                Stop Charging
            </button>

            <div className="mt-4">
                <p className="mb-2">Select Mode:</p>
                <button
                    className="bg-purple-600 px-3 py-2 rounded-lg mr-3"
                    onClick={() => setMode("normal")}
                >
                    Normal
                </button>
                <button
                    className="bg-blue-600 px-3 py-2 rounded-lg"
                    onClick={() => setMode("fast")}
                >
                    Fast
                </button>
            </div>
        </div>
    );
}
