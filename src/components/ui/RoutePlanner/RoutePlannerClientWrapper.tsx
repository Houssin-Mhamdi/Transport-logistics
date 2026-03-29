"use client";

import { useState, useEffect } from "react";
import { RoutePlan } from "@/types";
import RouteInputs from "./RouteInputs";
import PricingCard from "./PricingCard";
import LiveMap from "./LiveMap";
import RouteOptions from "./RouteOptions";
import { VEHICLES } from "@/lib/constants";
import FleetShowcase from "../FleetShowcase";

interface RoutePlannerClientWrapperProps {
  initialRoute: RoutePlan;
}

export default function RoutePlannerClientWrapper({ initialRoute }: RoutePlannerClientWrapperProps) {
  const [route, setRoute] = useState<RoutePlan>(initialRoute);
  const [isLodingRoute, setIsLoadingRoute] = useState(false);


  // Pricing calculation helper
  const calculatePricing = (distance: number, vehicleId: string) => {
    const vehicle = VEHICLES.find(v => v.id === vehicleId) || VEHICLES[1]; // fallback to transporter
    const ratePerKm = vehicle.baseRate;
    const baseFee = vehicle.baseFee;
    const fuelSurcharge = (distance * ratePerKm) * 0.12; // 12% surcharge
    const tollFees = 89.00; // static for now
    const total = (distance * ratePerKm) + baseFee + fuelSurcharge + tollFees;

    return {
      ratePerKm,
      baseFee,
      fuelSurcharge,
      tollFees,
      total,
      currency: "EUR",
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  };

  // Effect to fetch real road distance when coordinates change
  useEffect(() => {
    const calculateRealDistance = async () => {
      // Get all named points (origin + stops)
      const namedPoints = [
        { name: route.origin.name, coords: route.origin.coordinates },
        ...route.stops.map(s => ({ name: s.name, coords: s.coordinates }))
      ].filter(p => {
        const hasCoords = p.coords && typeof p.coords.lat === 'number' && typeof p.coords.lng === 'number';
        return p.name && p.name.trim() !== "" && hasCoords;
      });

      if (namedPoints.length < 2) {
        if (route.totalDistance !== 0) {
           setRoute(prev => ({ ...prev, totalDistance: 0 }));
        }
        return;
      }

      const validCoords = namedPoints.map(p => p.coords as { lat: number; lng: number });

      setIsLoadingRoute(true);
      try {
        const coordString = validCoords.map(p => `${p.lng},${p.lat}`).join(";");
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=false`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          const distanceInKm = data.routes[0].distance / 1000;
          const newDistance = parseFloat(distanceInKm.toFixed(2));
          
          setRoute(prev => ({
            ...prev,
            totalDistance: newDistance,
            pricing: calculatePricing(newDistance, prev.vehicleType || "transporter")
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

  const handleVehicleSelect = (vehicleId: 'car' | 'transporter' | 'suitcase' | 'suitcase_lift') => {
    setRoute(prev => ({
      ...prev,
      vehicleType: vehicleId,
      pricing: calculatePricing(prev.totalDistance, vehicleId)
    }));
  };

  return (
    <div className="space-y-6">
      <section className="px-8 max-w-[1920px] mx-auto grid grid-cols-12 gap-6 relative">
        {isLodingRoute && (
           <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 overflow-hidden z-50">
              <div className="h-full bg-primary animate-progress-line" />
           </div>
        )}
        
        {/* Left Column: Pricing (Top) + Inputs */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <RouteInputs route={route} onChange={handleRouteChange} />
          <PricingCard route={route} onVehicleChange={handleVehicleSelect} />
        </div>

        {/* Right Column: Map + Options */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <LiveMap route={route} />
          <RouteOptions route={route} />
        </div>
      </section>

      {/* Full Width Fleet Showcase for selection */}
      <div className="px-8 pb-24 max-w-[1920px] mx-auto">
        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline/10 overflow-hidden">
          <h3 className="text-2xl font-black text-primary mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl">minor_crash</span>
            Choose Your Delivery Asset
          </h3>
     
        </div>
      </div>
    </div>
  );
}
