"use client";

import { RoutePlan } from "@/types";

interface TelemetryStatsProps {
  route: RoutePlan;
}

export default function TelemetryStats({ route }: TelemetryStatsProps) {
  return (
    <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap gap-4">
      {/* Travel Time */}
      <div className="glass-panel px-6 py-4 rounded-lg flex items-center gap-4 flex-grow min-w-[200px]">
        <div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
            speed
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Est. Travel Time
          </p>
          <p className="text-lg font-black text-primary">{route.estimatedTime}</p>
        </div>
      </div>

      {/* Carbon Footprint */}
      <div className="glass-panel px-6 py-4 rounded-lg flex items-center gap-4 flex-grow min-w-[200px]">
        <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            eco
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Carbon Footprint
          </p>
          <p className="text-lg font-black text-primary">{route.carbonFootprint} kg CO2</p>
        </div>
      </div>

      {/* Congestion */}
      <div className="glass-panel px-6 py-4 rounded-lg flex items-center gap-4 flex-grow min-w-[200px]">
        <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>
            traffic
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Congestion Index
          </p>
          <p className="text-lg font-black text-primary">
            {route.congestionIndex <= 20 ? "Low" : route.congestionIndex <= 50 ? "Moderate" : "High"} ({route.congestionIndex}%)
          </p>
        </div>
      </div>
    </div>
  );
}