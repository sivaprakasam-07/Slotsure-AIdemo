export default function GunView({ station, gunId }) {
    const gun = station?.guns?.[gunId];
    if (!gun) return <p className="text-white">Gun not found</p>;

    const tel = gun.telemetry || {};
    const veh = gun.vehicle || {};

    const isCharging = gun.status === "charging";

    const formatGunHeading = (id) => {
        if (!id) return "Gun";
        const m = id.match(/(\d+)/);
        if (m) {
            const n = m[0].padStart(2, "0");
            return `Gun-${n}`;
        }
        // fallback: use id as-is but normalized
        return `Gun-${id}`;
    };

    return (
        <div className="text-white py-2 px-1">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-extrabold">{formatGunHeading(gunId)}</h2>
                <p className="text-sm text-slate-400 mt-1">Details and live telemetry</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-xl p-3 bg-slate-800/60 text-center ${isCharging ? 'ring-2 ring-cyan-400/30 animate-pulse' : ''}`}>
                    <div className="text-sm text-slate-300">Voltage</div>
                    <div className="text-lg font-semibold text-white">{tel.voltage ?? '—'} V</div>
                </div>

                <div className={`rounded-xl p-3 bg-slate-800/60 text-center ${isCharging ? 'ring-2 ring-cyan-400/30 animate-pulse' : ''}`}>
                    <div className="text-sm text-slate-300">Current</div>
                    <div className="text-lg font-semibold text-white">{tel.current ?? '—'} A</div>
                </div>

                <div className={`rounded-xl p-3 bg-slate-800/60 text-center ${isCharging ? 'ring-2 ring-cyan-400/30 animate-pulse' : ''}`}>
                    <div className="text-sm text-slate-300">Power</div>
                    <div className="text-lg font-semibold text-white">{tel.powerKW ?? '—'} kW</div>
                </div>

                <div className={`rounded-xl p-3 bg-slate-800/60 text-center ${isCharging ? 'ring-2 ring-cyan-400/30 animate-pulse' : ''}`}>
                    <div className="text-sm text-slate-300">Duration</div>
                    <div className="text-lg font-semibold text-white">{tel.durationSec ?? '—'} s</div>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 bg-slate-800/60 text-center">
                    <div className="text-sm text-slate-300">Est. Time</div>
                    <div className="text-lg font-semibold text-white">{tel.estimatedTimeMin ?? '—'} min</div>
                </div>

                <div className="rounded-xl p-3 bg-slate-800/60 text-center">
                    <div className="text-sm text-slate-300">Battery</div>
                    <div className="text-lg font-semibold text-white">{veh.batteryKWh ?? '—'} kWh</div>
                </div>
            </div>

            <div className="mt-5 flex justify-center">
                <button className={`px-6 py-2 rounded-full font-medium ${isCharging ? 'bg-red-600 hover:bg-red-500' : 'bg-cyan-500 hover:bg-cyan-400'} transition`}>
                    {isCharging ? 'Stop Charging' : 'Start Charging'}
                </button>
            </div>
        </div>
    );
}
