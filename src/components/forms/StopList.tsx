"use client";

import { RouteStop } from "@/types";
import PlacesAutocomplete from "./PlacesAutocomplete";

interface StopListProps {
  stops: RouteStop[];
  onRemove: (stopId: string) => void;
  onChange: (stopId: string, value: string, coordinates?: { lat: number; lng: number }) => void;
}

export default function StopList({ stops, onRemove, onChange }: StopListProps) {
  if (stops.length === 0) {
    return (
      <div className="space-y-4">
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
          Delivery Stops
        </label>
        <p className="text-sm text-on-surface-variant italic">No stops added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
        Delivery Stops
      </label>
      {stops.map((stop, index) => (
        <div key={stop.id} className="flex items-center gap-4 group">
          {/* Timeline indicator */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
            {index < stops.length - 1 && (
              <div className="w-0.5 h-10 bg-outline-variant/30"></div>
            )}
          </div>
          
          {/* Stop autocomplete */}
          <div className="flex-grow relative">
            <PlacesAutocomplete
              value={stop.name}
              onChange={(value, coords) => onChange(stop.id, value, coords)}
              placeholder={`Delivery Stop ${index + 1}`}
            />
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-error transition-colors p-1 rounded-full hover:bg-error/10 z-10"
              onClick={() => onRemove(stop.id)}
              aria-label={`Remove stop ${index + 1}`}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}