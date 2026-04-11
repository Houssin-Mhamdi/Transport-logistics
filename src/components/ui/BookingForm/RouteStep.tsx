"use client";

import { useRef } from "react";
import PlacesAutocomplete from "@/components/forms/PlacesAutocomplete";
import { VEHICLES } from "@/lib/constants";

interface RouteStepProps {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  price: string;
}

const vehicles = [
  {
    id: "pkw_kombi",
    name: "Passenger Car Estate",
    image: "🚗",
    maxWeight: "300 kg",
    dimensions: "160 × 120 × 120 cm",
    tags: ["Documents", "Packages"],
    price: 161.60,
  },
  {
    id: "transporter",
    name: "Transporter",
    image: "🚐",
    maxWeight: "1,200 kg",
    dimensions: "430 × 180 × 120 cm",
    tags: ["Large Items"],
    price: 196.24,
  },
  {
    id: "koffer",
    name: "Box Truck",
    image: "🚚",
    maxWeight: "1,200 kg",
    dimensions: "420 × 210 × 210 cm",
    tags: ["Furniture"],
    price: 224.90,
  },
  {
    id: "koffer_hebebuehne",
    name: "Box Truck with Liftgate",
    image: "🚛",
    maxWeight: "1,000 kg",
    dimensions: "420 × 210 × 210 cm",
    tags: ["Heavy Items"],
    price: 305.88,
  },
];

export default function RouteStep({ data, onUpdate, onNext, price }: RouteStepProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const getVehiclePrice = (vehicleId: string, fallbackPrice: number) => {
    if (!data.distance) return fallbackPrice.toFixed(2);
    
    const vehicleMap: Record<string, string> = {
      pkw_kombi: "car",
      transporter: "transporter",
      koffer: "suitcase",
      koffer_hebebuehne: "suitcase_lift"
    };

    const vId = vehicleMap[vehicleId] || "transporter";
    const vehicleObj = VEHICLES.find(v => v.id === vId) || VEHICLES[1];
    
    const ratePerKm = vehicleObj.baseRate;
    const baseFee = vehicleObj.baseFee;
    const fuelSurcharge = (data.distance * ratePerKm) * 0.12; 
    const tollFees = 89.00; 
    
    return ((data.distance * ratePerKm) + baseFee + fuelSurcharge + tollFees).toFixed(2);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-center mb-2">Calculate Price for Courier Service</h1>
        <p className="text-center text-on-surface-variant">Enter pickup and delivery addresses</p>
      </div>

      {/* Pickup Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <h2 className="text-xl font-bold text-primary">Pickup</h2>
          </div>
          <button 
            onClick={() => onUpdate({ extraPickups: [...(data.extraPickups || []), { address: "" }] })}
            className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-sm mr-1">add</span>
            Add Another Pickup
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Start Address</label>
            <div className="flex gap-2 relative" style={{ zIndex: 100 }}>
              <div className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                <PlacesAutocomplete
                  value={data.pickupAddress}
                  onChange={(value, coords) => onUpdate({ pickupAddress: value, pickupCoords: coords })}
                  placeholder="Enter city or address"
                  icon="location_on"
                />
              </div>
            </div>
          </div>
          {data.extraPickups?.map((pickup: any, index: number) => (
            <div key={`pickup-${index}`}>
               <label className="block text-sm font-semibold mb-2">Stop {index + 1}</label>
               <div className="flex gap-2 relative" style={{ zIndex: 99 - index }}>
                  <div className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <PlacesAutocomplete
                      value={pickup.address}
                      onChange={(value, coords) => {
                         const newPickups = [...data.extraPickups];
                         newPickups[index] = { address: value, coords };
                         onUpdate({ extraPickups: newPickups });
                      }}
                      placeholder="Enter city or address"
                      icon="location_on"
                    />
                  </div>
                  <button onClick={() => {
                     const newPickups = [...data.extraPickups];
                     newPickups.splice(index, 1);
                     onUpdate({ extraPickups: newPickups });
                  }} className="px-3 hover:bg-red-50 text-red-500 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative z-40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">near_me</span>
            <h2 className="text-xl font-bold text-secondary">Delivery</h2>
          </div>
          <button 
             onClick={() => onUpdate({ extraDeliveries: [...(data.extraDeliveries || []), { address: "" }] })}
             className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-sm mr-1">add</span>
            Add Another Delivery
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Destination Address</label>
            <div className="flex gap-2 relative" style={{ zIndex: 50 }}>
              <div className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                <PlacesAutocomplete
                  value={data.deliveryAddress}
                  onChange={(value, coords) => onUpdate({ deliveryAddress: value, deliveryCoords: coords })}
                  placeholder="Enter city or address"
                  icon="near_me"
                />
              </div>
            </div>
          </div>
          {data.extraDeliveries?.map((delivery: any, index: number) => (
            <div key={`delivery-${index}`}>
               <label className="block text-sm font-semibold mb-2">Delivery Stop {index + 1}</label>
               <div className="flex gap-2 relative" style={{ zIndex: 49 - index }}>
                  <div className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <PlacesAutocomplete
                      value={delivery.address}
                      onChange={(value, coords) => {
                         const newDeliveries = [...data.extraDeliveries];
                         newDeliveries[index] = { address: value, coords };
                         onUpdate({ extraDeliveries: newDeliveries });
                      }}
                      placeholder="Enter city or address"
                      icon="near_me"
                    />
                  </div>
                  <button onClick={() => {
                     const newDeliveries = [...data.extraDeliveries];
                     newDeliveries.splice(index, 1);
                     onUpdate({ extraDeliveries: newDeliveries });
                  }} className="px-3 hover:bg-red-50 text-red-500 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Route Info */}
      {(data.pickupAddress && data.deliveryAddress && data.distance > 0) && (
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">route</span>
            <span className="text-sm font-semibold text-primary">Route Information</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-black text-primary">{data.distance} km</span>
            <span className="text-slate-400">•</span>
            <span className="text-lg text-on-surface-variant">{data.duration}</span>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-primary">ab {price} €</p>
            <p className="text-xs text-on-surface-variant mt-1">excl. 19% VAT • brutto ab {(parseFloat(price) * 1.19).toFixed(2)} €</p>
          </div>
        </div>
      )}

      {/* Vehicle Selection */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold mb-6">Select Vehicle</h2>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => onUpdate({ selectedVehicle: vehicle.id })}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                data.selectedVehicle === vehicle.id
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="vehicle"
                    checked={data.selectedVehicle === vehicle.id}
                    onChange={() => {}}
                    className="w-5 h-5 text-primary flex-shrink-0"
                  />
                  <div className="text-4xl flex-shrink-0">{vehicle.image}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{vehicle.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vehicle.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium rounded">
                        {tag}
                       </span>
                    ))}
                  </div>
                  <p className="text-sm text-on-surface-variant mt-2">
                    Max. {vehicle.maxWeight} • {vehicle.dimensions}
                  </p>
                </div>
                <div className="md:text-right flex items-center justify-between md:block pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 w-full md:w-auto">
                  <span className="text-sm text-on-surface-variant md:hidden">Price</span>
                  <div>
                    <p className="text-2xl font-bold text-primary">{getVehiclePrice(vehicle.id, vehicle.price)} €</p>
                    <p className="text-xs text-on-surface-variant md:text-right text-right">Netto</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold mb-6">When should we pick up?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button className="p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl opacity-50 cursor-not-allowed text-left">
            <p className="font-semibold text-slate-400">Tomorrow</p>
            <p className="text-sm text-slate-400">Sunday • 05.04</p>
            <p className="text-xs text-orange-500 mt-2">Phone booking only</p>
          </button>
          <button 
            onClick={() => onUpdate({ pickupDate: "2026-04-06" })}
            className={`p-4 border-2 rounded-xl transition-all text-left ${
              data.pickupDate === "2026-04-06"
                ? "border-primary bg-primary/10"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            }`}
          >
            <p className="font-semibold">Day After Tomorrow</p>
            <p className="text-sm text-on-surface-variant">Monday • 06.04</p>
          </button>
          <div 
            onClick={() => dateInputRef.current?.showPicker()}
            className={`p-4 border-2 rounded-xl transition-all text-left relative overflow-hidden cursor-pointer ${
              data.pickupDate && data.pickupDate !== "2026-04-06"
                ? "border-primary bg-primary/10"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            }`}>
            <span className="material-symbols-outlined text-3xl mb-1 text-primary relative z-10">calendar_today</span>
            <p className="font-semibold relative z-10">Calendar</p>
            {data.pickupDate && data.pickupDate !== "2026-04-06" && (
                <p className="text-sm text-primary font-bold relative z-10 mt-2">{data.pickupDate}</p>
            )}
            <input 
               ref={dateInputRef}
               type="date" 
               className="absolute bottom-0 left-0 opacity-0 w-0 h-0 pointer-events-none"
               value={data.pickupDate || ""}
               onChange={(e) => onUpdate({ pickupDate: e.target.value })}
            />
          </div>
        </div>

        {data.pickupDate && (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
              <p className="font-semibold text-green-700 dark:text-green-400">Pickup possible anytime</p>
              <p className="text-sm text-green-600 dark:text-green-500">Exact pickup time will be set in next steps</p>
            </div>

            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="text-center">
                <span className="material-symbols-outlined text-primary mb-1 block">location_on</span>
                <p className="font-semibold">Pickup</p>
                <p className="text-sm text-on-surface-variant">{data.pickupDate}</p>
                <p className="text-xs text-primary font-semibold">Time window follows</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">directions_car</span>
                <span className="text-sm font-medium">2h 18min</span>
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-secondary mb-1 block">near_me</span>
                <p className="font-semibold">Delivery</p>
                <p className="text-sm text-on-surface-variant">{data.pickupDate}</p>
                <p className="text-xs text-secondary">ca. 2h 18min after pickup</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <button
        onClick={onNext}
        disabled={!data.pickupAddress || !data.deliveryAddress}
        className="w-full py-5 bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
      >
        Continue to Shipment
      </button>

      <div className="flex items-center justify-center gap-4 text-sm">
        <button className="text-on-surface-variant hover:text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">mail</span>
          Request non-binding offer
        </button>
        <span className="text-slate-300">•</span>
        <button className="text-on-surface-variant hover:text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">download</span>
          Offer as PDF
        </button>
      </div>
    </div>
  );
}