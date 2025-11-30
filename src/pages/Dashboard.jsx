import { useEffect, useState } from "react";
import { listenSlots } from "../firebase/database";
import SlotCard from "../components/SlotCard";

export default function Dashboard() {
    const [slots, setSlots] = useState(null);

    useEffect(() => {
        const unsubscribe = listenSlots((data) => {
            console.log("Realtime Slots:", data);
            setSlots(data);
        });

        return () => {
            if (typeof unsubscribe === "function") unsubscribe();
        };
    }, []);

    if (!slots) return <p className="text-white p-5">Loading...</p>;

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto text-center px-4">
                <h1 className="text-4xl font-extrabold text-white mb-2">SlotSure AI ⚡ Charging Dashboard</h1>
                /<p className="text-slate-300 mb-8">Live monitoring and controls for your charging stations — clear, responsive, and fast.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SlotCard name="Slot 1" data={slots.slot1} />
                    <SlotCard name="Slot 2" data={slots.slot2} />
                </div>
            </div>
        </div>
    );
}
