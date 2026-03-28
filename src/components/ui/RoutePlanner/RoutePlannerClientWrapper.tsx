"use client";

import { useState, useEffect } from "react";
import { RoutePlan } from "@/types";
import RouteInputs from "./RouteInputs";
import PricingCard from "./PricingCard";
import LiveMap from "./LiveMap";
import RouteOptions from "./RouteOptions";

interface RoutePlannerClientWrapperProps {
  initialRoute: RoutePlan;
}

export default function RoutePlannerClientWrapper({ initialRoute }: RoutePlannerClientWrapperProps) {
  const [route, setRoute] = useState<RoutePlan>(initialRoute);
  const [isLodingRoute, setIsLoadingRoute] = useState(false);

  // Effect to fetch real road distance when coordinates change
  useEffect(() => {
    const calculateRealDistance = async () => {
      // Get all named points (origin + stops)
      const namedPoints = [
        { name: route.origin.name, coords: route.origin.coordinates },
        ...route.stops.map(s => ({ name: s.name, coords: s.coordinates }))
      ].filter(p => p.name && p.name.trim() !== "");

      // If any typed name is missing coordinates, reset distance
      if (namedPoints.some(p => !p.coords)) {
        if (route.totalDistance !== 0) {
           setRoute(prev => ({ ...prev, totalDistance: 0 }));
        }
        return;
      }

      const validCoords = namedPoints.map(p => p.coords as { lat: number; lng: number });

      if (validCoords.length < 2) {
        if (route.totalDistance !== 0) {
           setRoute(prev => ({ ...prev, totalDistance: 0 }));
        }
        return;
      }

      setIsLoadingRoute(true);
      try {
        const coordString = validCoords.map(p => `${p.lng},${p.lat}`).join(";");
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=false`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          const distanceInKm = data.routes[0].distance / 1000;
          
          setRoute(prev => ({
            ...prev,
            totalDistance: parseFloat(distanceInKm.toFixed(2))
          }));
        }
      } catch (error) {
        console.error("Routing error:", error);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    const timeoutId = setTimeout(calculateRealDistance, 1000);
    return () => clearTimeout(timeoutId);
  }, [route.origin.coordinates, route.stops]);

  const handleRouteChange = (updatedRoute: RoutePlan) => {
    setRoute(updatedRoute);
  };

  return (
    <section className="px-8 pb-24 max-w-[1920px] mx-auto grid grid-cols-12 gap-6 relative">
      {isLodingRoute && (
         <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 overflow-hidden z-50">
            <div className="h-full bg-primary animate-progress-line" />
         </div>
      )}
      
      {/* Left Column: Inputs + Pricing */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <RouteInputs route={route} onChange={handleRouteChange} />
        <PricingCard route={route} />
      </div>

      {/* Right Column: Map + Options */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
        <LiveMap route={route} />
        <RouteOptions route={route} />
      </div>
    </section>
  );
}
