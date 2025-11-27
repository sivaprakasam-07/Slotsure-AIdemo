export default function StatusPanel({ data }) {
    if (!data) {
        return (
            <div className="bg-gray-800 text-white p-4 rounded-lg">
                <p>Loading Status...</p>
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
        <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Status Panel</h2>

            <p className="text-lg">
                Gun Status: <span className={`${color}`}>{status}</span>
            </p>

            <p className="mt-2 text-md">
                Mode: <span className="text-purple-400">{mode}</span>
            </p>
        </div>
    );
}
