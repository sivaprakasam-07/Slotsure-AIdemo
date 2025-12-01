import { useEffect, useState } from "react";

export default function Modal({ children, onClose }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // trigger enter animation after mount
        const t = setTimeout(() => setOpen(true), 10);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            />

            {/* modal container (compact) */}
            <div
                role="dialog"
                aria-modal="true"
                className={`relative max-w-sm w-full mx-4 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-200 ease-out transform ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                style={{ padding: "10px" }}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="text-slate-400 hover:text-white text-lg absolute right-3 top-3"
                >
                    ✕
                </button>

                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}
