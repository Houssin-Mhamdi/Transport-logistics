"use client";

import { motion } from "framer-motion";
import { VEHICLES } from "@/lib/constants";
import { RoutePlan } from "@/types";

interface VehicleSelectorProps {
  route: RoutePlan;
  onVehicleSelect: (vehicleId: typeof VEHICLES[number]["id"]) => void;
}

export default function VehicleSelector({ route, onVehicleSelect }: VehicleSelectorProps) {
  return (
    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/10 h-full">
      <h3 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
        <span className="material-symbols-outlined">local_shipping</span>
        Select Transport Vehicle
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VEHICLES.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onVehicleSelect(vehicle.id)}
            className={`
              relative p-5 rounded-xl border-2 transition-all cursor-pointer group
              ${route.vehicleType === vehicle.id 
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                : "border-transparent bg-white hover:border-outline/30 shadow-sm"
              }
            `}
          >
            {route.vehicleType === vehicle.id && (
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              </div>
            )}
            
            <div className="flex gap-4 items-start">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center transition-colors
                ${route.vehicleType === vehicle.id ? "bg-primary text-white" : "bg-primary/5 text-primary group-hover:bg-primary/10"}
              `}>
                <span className="material-symbols-outlined text-2xl">{vehicle.icon}</span>
              </div>
              
              <div>
                <div className="font-bold text-primary text-sm mb-1">{vehicle.name}</div>
                <div className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-2">
                  €{vehicle.baseRate}/km + €{vehicle.baseFee} Base
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="material-symbols-outlined text-sm">weight</span>
                    {vehicle.capacity}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="material-symbols-outlined text-sm">straighten</span>
                    {vehicle.dimensions}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
