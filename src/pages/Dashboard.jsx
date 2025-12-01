import { useEffect, useState, useRef } from "react";
import { listenStations } from "../firebase/database";
import toast from "react-hot-toast";
import StationCard from "../components/StationCard";
import Modal from "../components/Modal";
import GunView from "../components/GunView";

export default function Dashboard() {
    const [stations, setStations] = useState({});
    const [activeStation, setActiveStation] = useState(null);
    const [activeGun, setActiveGun] = useState(null);

    const _initialized = useRef(false);
    const _recentEvents = useRef(new Set());
    const _prev = useRef({});

    const notifyOnce = (key, message, opts = {}) => {
        const s = _recentEvents.current;
        if (s.has(key)) return;
        s.add(key);
        toast(message, opts);
        // remove after duration so repeats can show later
        setTimeout(() => s.delete(key), 4500);
    };

    const formatLabel = (stationId, gunId) => {
        const sNum = (stationId || "").match(/(\d+)/);
        const gNum = (gunId || "").match(/(\d+)/);
        const sLabel = sNum ? `Station-${parseInt(sNum[0], 10)}` : `Station-${stationId}`;
        const gLabel = gNum ? `Gun-${parseInt(gNum[0], 10)}` : `Gun-${gunId}`;
        return `${sLabel} ${gLabel}`;
    };

    const formatStationName = (stationId) => {
        const sNum = (stationId || "").match(/(\d+)/);
        return sNum ? `Station-${parseInt(sNum[0], 10)}` : stationId;
    };

    // subscribe to firebase; listener only updates state
    useEffect(() => {
        const unsubscribe = listenStations((data) => {
            setStations(data || {});
        });
        return () => {
            if (typeof unsubscribe === "function") unsubscribe();
        };
    }, []);

    // run notifications after `stations` state updates (post-render)
    useEffect(() => {
        const next = stations || {};

        // On first update, just initialize prev and skip notifications
        if (!_initialized.current) {
            _initialized.current = true;
            _prev.current = next;
            return;
        }

        const prev = _prev.current || {};

        // compare prev vs next for status changes
        for (const stationId of Object.keys(next)) {
            const gunsNext = next[stationId]?.guns || {};
            const gunsPrev = prev[stationId]?.guns || {};

            for (const gunId of Object.keys(gunsNext)) {
                const prevStatus = gunsPrev?.[gunId]?.status;
                const nextStatus = gunsNext?.[gunId]?.status;

                if (prevStatus !== nextStatus) {
                    const label = formatLabel(stationId, gunId);
                    if (nextStatus === "charging") {
                        const key = `start:${stationId}|${gunId}`;
                        notifyOnce(key, `${label} is charging`, { icon: '✅' });
                    } else if (prevStatus === "charging" && nextStatus !== "charging") {
                        const key = `stop:${stationId}|${gunId}`;
                        notifyOnce(key, `${label} stopped charging`, { icon: '⏹️' });
                    }
                }
            }
        }

        // commit prev snapshot
        _prev.current = next;
    }, [stations]);

    const handleStationClick = (stationId) => {
        setActiveStation(stationId);
        setActiveGun(null);
    };

    const station = activeStation ? stations[activeStation] : null;
    const gunList = station?.guns ? Object.keys(station.guns) : [];

    return (
        <div className="text-white">
            <h1 className="text-center text-4xl font-bold mb-10">
                SlotSure AI ⚡ EV Charging Dashboard
            </h1>

            {/* Stations */}
            <div className="grid grid-cols-1 gap-6">
                {Object.entries(stations).map(([id, station]) => (
                    <StationCard key={id} stationId={id} station={station} onOpen={handleStationClick} />
                ))}
            </div>

            {/* Modal for Guns */}
            {activeStation && (
                <Modal onClose={() => setActiveStation(null)}>
                    {!activeGun ? (
                        <div className="px-3 py-2">
                            <h3 className="text-xl font-semibold text-center text-white mb-3">Select Gun — {formatStationName(activeStation)}</h3>
                            <p className="text-sm text-slate-400 text-center mb-4">Choose a gun to view details and controls</p>

                            <div className="grid grid-cols-1 gap-3">
                                {gunList.map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setActiveGun(g)}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 transition transform hover:-translate-y-1"
                                    >
                                        <span className="text-cyan-300 text-lg">⚡</span>
                                        <span className="flex-1 text-left text-white font-medium">{g.toUpperCase()}</span>
                                        <span className="text-slate-400 text-sm">View</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="px-2 py-1">
                            <GunView station={station} gunId={activeGun} />
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}
