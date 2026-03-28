"use client";

import { useState } from "react";
import { RoutePlan } from "@/types";
import { ROUTE_TYPES } from "@/lib/constants";

interface RouteOptionsProps {
  route: RoutePlan;
  onRouteTypeChange?: (type: RoutePlan["routeType"]) => void;
}

export default function RouteOptions({ route, onRouteTypeChange }: RouteOptionsProps) {
  const [selectedType, setSelectedType] = useState<RoutePlan["routeType"]>(route.routeType);

  const handleSelect = (type: RoutePlan["routeType"]) => {
    setSelectedType(type);
    onRouteTypeChange?.(type);
  };

  // Filter to show only express and eco options (standard is default)
  const options = ROUTE_TYPES.filter(t => t.id !== "standard");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {options.map((option: any) => (
        <button
          key={option.id}
          className={`bg-surface-container-low p-6 rounded-xl border flex items-start gap-4 transition-all cursor-pointer text-left ${
            selectedType === option.id
              ? "border-primary/40 ring-2 ring-primary/20"
              : "border-primary/10 hover:border-primary/40"
          }`}
          onClick={() => handleSelect(option.id as RoutePlan["routeType"])}
        >
          {/* Icon */}
          <div className={`p-3 rounded-lg ${
            option.color === "secondary-container" 
              ? "bg-secondary-container text-on-secondary-container"
              : option.color === "surface-container-highest"
              ? "bg-surface-container-highest text-primary"
              : "bg-primary text-on-primary"
          }`}>
            <span className="material-symbols-outlined">{option.icon}</span>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-primary">{option.name}</h3>
            <p className="text-sm text-on-surface-variant mt-1">{option.description}</p>
            {option.benefit && (
              <span className={`inline-block mt-3 text-xs font-black ${
                option.benefitColor || "text-secondary-container"
              }`}>
                {option.benefit}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}