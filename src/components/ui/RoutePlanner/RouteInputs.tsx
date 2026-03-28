"use client";

import { useState } from "react";
import { RoutePlan, RouteStop } from "@/types";
import PlacesAutocomplete from "@/components/forms/PlacesAutocomplete";
import StopList from "@/components/forms/StopList";

interface RouteInputsProps {
  route: RoutePlan;
  onChange: (route: RoutePlan) => void;
}

export default function RouteInputs({ route, onChange }: RouteInputsProps) {
  const handleOriginChange = (value: string, coords?: { lat: number; lng: number }) => {
    onChange({
      ...route,
      origin: { ...route.origin, name: value, address: value, coordinates: coords },
    });
  };

  const handleAddStop = () => {
    const newStop: RouteStop = {
      id: `stop-${Date.now()}`,
      name: "",
      address: "",
      order: route.stops.length + 1,
    };
    onChange({
      ...route,
      stops: [...route.stops, newStop],
    });
  };

  const handleStopChange = (stopId: string, value: string, coords?: { lat: number; lng: number }) => {
    onChange({
      ...route,
      stops: route.stops.map((stop) =>
        stop.id === stopId ? { ...stop, name: value, address: value, coordinates: coords } : stop
      ),
    });
  };

  const handleRemoveStop = (stopId: string) => {
    onChange({
      ...route,
      stops: route.stops.filter(stop => stop.id !== stopId).map((stop, index) => ({
        ...stop,
        order: index + 1
      }))
    });
  };

  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">distance</span>
        </div>
        <h2 className="text-xl font-bold text-primary">Define Trajectory</h2>
      </div>

      <div className="space-y-6">
        {/* Origin Input */}
        <PlacesAutocomplete
          label="Start Location"
          icon="my_location"
          value={route.origin.name || ""}
          onChange={handleOriginChange}
          placeholder="Enter starting address"
        />

        {/* Stops List */}
        <StopList
          stops={route.stops}
          onRemove={handleRemoveStop}
          onChange={handleStopChange}
        />

        {/* Add Multiple Button */}
        <button 
          className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-outline-variant hover:border-primary hover:text-primary rounded-md transition-all text-on-surface-variant font-bold text-sm uppercase tracking-widest"
          onClick={handleAddStop}
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Add Delivery Stop
        </button>
      </div>
    </div>
  );
}