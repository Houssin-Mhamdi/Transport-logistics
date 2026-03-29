"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackingInput() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const router = useRouter();

    const handleTrack = () => {
        router.push("/route-planner");
        // if (trackingNumber.trim()) {
        //     // Implement tracking logic here
        //     console.log("Tracking:", trackingNumber);
        // }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleTrack();
    };

    return (
        <div className="bg-surface-container-lowest p-2 rounded-xl shadow-2xl max-w-md flex flex-col md:flex-row gap-2">
            <div className="flex-grow flex items-center px-4">
                <span className="material-symbols-outlined text-outline mr-3">distance</span>
                <input
                    className="w-full border-none focus:ring-0 bg-transparent text-on-surface placeholder:text-outline-variant font-medium py-3 outline-none"
                    placeholder="Enter Tracking Number"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <button
                className="bg-primary cursor-pointer text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all"
                onClick={handleTrack}
            >
                Track Now
            </button>
        </div>
    );
}