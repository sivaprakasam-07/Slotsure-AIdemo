export default function SlotCard({ name, data }) {
    if (!data) return null;

    const glow = data.status === "charging"
        ? "shadow-[0_0_25px_#00f7ff]"
        : data.vehicle?.plugged
            ? "shadow-[0_0_25px_#2979ff]"
            : "shadow-[0_0_10px_#ffffff20]";

    return (
        <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 ${glow}`}>
            <h2 className="text-2xl font-bold text-white mb-3">{name}</h2>

            <p className="text-white font-semibold text-lg">
                Status: {data.status}
            </p>

            <p className="text-blue-300">Mode: {data.mode}</p>

            <div className="mt-4 space-y-1 text-gray-300">
                <p>🔋 Voltage: {data.telemetry.voltage} V</p>
                <p>⚡ Current: {data.telemetry.current} A</p>
                <p>⚙ Power: {data.telemetry.powerKW} kW</p>
                <p>⏱ Duration: {data.telemetry.durationSec}s</p>
                <p>⌛ Est. Finish: {data.telemetry.estimatedTimeMin} min</p>
            </div>

            <div className="mt-4 text-gray-200">
                <p>Battery: {data.vehicle.batteryKWh} kWh</p>
                <p>Plugged: {data.vehicle.plugged ? "Yes 🚗" : "No"}</p>
            </div>

            <button className="mt-6 w-full py-2 rounded-xl border border-white/40 text-white hover:bg-white/20">
                {data.status === "charging" ? "Stop Charging" : "Start Charging"}
            </button>
        </div>
    );
}
