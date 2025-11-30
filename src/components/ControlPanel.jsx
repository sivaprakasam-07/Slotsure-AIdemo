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
        <div className="bg-gradient-to-br from-white/4 to-white/6 border border-white/8 rounded-2xl p-5 text-white mt-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Control Panel</h2>

            <div className="flex gap-3">
                <button
                    className="flex-1 bg-green-600 px-4 py-2 rounded-lg shadow-sm hover:brightness-95"
                    onClick={handleStart}
                >
                    Start Charging
                </button>

                <button
                    className="flex-1 bg-red-600 px-4 py-2 rounded-lg shadow-sm hover:brightness-95"
                    onClick={handleStop}
                >
                    Stop Charging
                </button>
            </div>

            <div className="mt-4">
                <p className="mb-2 text-sm">Select Mode:</p>
                <div className="flex gap-3">
                    <button
                        className="bg-purple-600 px-3 py-2 rounded-lg text-sm"
                        onClick={() => setMode("normal")}
                    >
                        Normal
                    </button>
                    <button
                        className="bg-blue-600 px-3 py-2 rounded-lg text-sm"
                        onClick={() => setMode("fast")}
                    >
                        Fast
                    </button>
                </div>
            </div>
        </div>
    );
}
