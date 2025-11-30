export default function SlotCard({ name, data }) {
    if (!data) return null;

    const isCharging = data.charging;
    const isOccupied = data.occupied;

    const statusLabel = isCharging ? "Charging" : isOccupied ? "Available" : "Idle";

    const badgeColor = isCharging
        ? "bg-blue-600 text-white"
        : isOccupied
            ? "bg-green-600 text-white"
            : "bg-gray-500 text-white";

    return (
        <div className="bg-gradient-to-br from-white/3 to-white/6 border border-white/8 rounded-2xl p-6 shadow-sm transition-transform hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold text-white mb-1">{name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}>{statusLabel}</span>
            </div>

            <div className="mt-4 text-slate-200 space-y-1">
                <p className="flex items-center gap-2">🔋 <span className="font-medium">Voltage:</span> <span className="text-white ml-2">{data.voltage} V</span></p>
                <p className="flex items-center gap-2">⚡ <span className="font-medium">Current:</span> <span className="text-white ml-2">{data.current} A</span></p>
                <p className="flex items-center gap-2">⚙ <span className="font-medium">Power:</span> <span className="text-white ml-2">{data.power} kW</span></p>
            </div>

            <div className="mt-5">
                {isCharging ? (
                    <button className="w-full py-2 rounded-xl bg-white/10 border border-white/12 text-white hover:bg-white/12">Stop Charging</button>
                ) : (
                    <button className="w-full py-2 rounded-xl bg-white/6 border border-white/12 text-white hover:bg-white/8">Start Charging</button>
                )}
            </div>
        </div>
    );
}
