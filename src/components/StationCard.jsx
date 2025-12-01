export default function StationCard({ stationId, station, onOpen }) {
    const location = station.location || {};
    const status = station.stationStatus || "unknown";

    const statusColor =
        status === "online"
            ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/50"
            : "bg-red-500/20 text-red-400 border-red-400/50";

    return (
        <button
            onClick={() => onOpen(stationId)}
            className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 shadow-lg 
                 text-left hover:bg-slate-800 transition-all"
        >
            <h2 className="text-xl font-bold text-slate-100">{location.name || stationId}</h2>
            <p className="text-sm text-slate-400">{location.address || "Location N/A"}</p>

            <span className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
                {status.toUpperCase()}
            </span>

            <p className="text-xs text-slate-500 mt-2">
                Last Update: <span className="text-slate-300">{station.lastUpdate}</span>
            </p>
        </button>
    );
}
