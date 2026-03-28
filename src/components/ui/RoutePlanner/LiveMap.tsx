"use client";

import { useState } from "react";
import { RoutePlan, MapLayer } from "@/types";
import { MAP_LAYERS } from "@/lib/constants";
import TelemetryStats from "./TelemetryStats";


interface LiveMapProps {
  route: RoutePlan;
}

const MAP_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBIpotPwPKWQ5EWDM_fEwXhLNNKwGqQ4TjiYb8gh1Wwswo8dvRorTGFpObyYwCjYONot2DvQxdhUJzOP-8EZpBIWX07QxGnRHA98WA0w_UhPc5S3IB4Dt3iJCjB3UhkfvfXxETYP-ugh0P0quvCujTyu1Zv-hFEiKhhmraVxQfIptQHQcVIipSx7W-HpyciMHLtfVcERN3-AExFQeshAOjJzfbDuOiz9SO_NuYPaJu6XOXvpaDQH_aZhKrc9pxNRi1vCCWyNLUIJ6uw";

export default function LiveMap({ route }: LiveMapProps) {
  const [layers, setLayers] = useState<MapLayer[]>(MAP_LAYERS);
  const [zoom, setZoom] = useState(6);

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex-grow min-h-[600px] relative group">
      {/* Map Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={MAP_IMAGE} 
          alt="Interactive route map of Europe" 
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${1 + (zoom - 6) * 0.1})` }}
        />
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 z-10 glass-panel p-4 rounded-lg flex flex-col gap-3 shadow-lg">
        <button 
          className="w-10 h-10 bg-white hover:bg-surface-container rounded flex items-center justify-center text-primary transition-colors"
          onClick={() => setZoom(Math.min(zoom + 1, 18))}
          aria-label="Zoom in"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
        <button 
          className="w-10 h-10 bg-white hover:bg-surface-container rounded flex items-center justify-center text-primary transition-colors"
          onClick={() => setZoom(Math.max(zoom - 1, 1))}
          aria-label="Zoom out"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        <div className="h-px bg-outline-variant/20 w-full"></div>
        <button 
          className="w-10 h-10 bg-white hover:bg-surface-container rounded flex items-center justify-center text-primary transition-colors"
          aria-label="Toggle layers"
        >
          <span className="material-symbols-outlined">layers</span>
        </button>
      </div>

      {/* Telemetry Stats */}
      <TelemetryStats route={route} />
    </div>
  );
}