export default function StatusPanel({ data }) {
    if (!data) {
        return (
            <div className="bg-gradient-to-br from-white/4 to-white/6 border border-white/8 p-4 rounded-lg shadow-sm">
                <p className="text-white">Loading Status...</p>
            </div>
        );
    }

    const { status, mode } = data;

    const statusColors = {
        available: "text-green-400",
        reserved: "text-yellow-400",
        charging: "text-blue-400",
        completed: "text-gray-400",
    };

    const color = statusColors[status] || "text-white";

    return (
        <div className="bg-gradient-to-br from-white/4 to-white/6 border border-white/8 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-white">Status Panel</h2>

            <p className="text-sm text-slate-200">
                Gun Status: <span className={`${color} font-medium ml-2`}>{status}</span>
            </p>

            <p className="mt-2 text-sm text-slate-200">
                Mode: <span className="text-purple-300 font-medium ml-2">{mode}</span>
            </p>
        </div>
    );
}
