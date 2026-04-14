"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
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
    price: 60.00,
  },
  {
    id: "transporter",
    name: "Transporter",
    image: "🚐",
    maxWeight: "1,200 kg",
    dimensions: "430 × 180 × 120 cm",
    tags: ["Large Items"],
    price: 60.00,
  },
  {
    id: "koffer",
    name: "Box Truck",
    image: "🚚",
    maxWeight: "1,200 kg",
    dimensions: "420 × 210 × 210 cm",
    tags: ["Furniture"],
    price: 60.00,
  },
  {
    id: "koffer_hebebuehne",
    name: "Box Truck with Liftgate",
    image: "🚛",
    maxWeight: "1,000 kg",
    dimensions: "420 × 210 × 210 cm",
    tags: ["Heavy Items"],
    price: 60.00,
  },
];

export default function RouteStep({ data, onUpdate, onNext, price }: RouteStepProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const getVehiclePrice = (vehicleId: string, fallbackPrice: number) => {
    if (!data.distance) return fallbackPrice.toFixed(2);
    
    const ratePerKm = 1.7; // New fixed rate per km
    
    // Calculate distance cost with 60€ minimum for distances <= 40km
    let total = data.distance * ratePerKm;
    if (data.distance <= 40) {
      total = 60;
    }
    
    return total.toFixed(2);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  const formatDateLabel = (date: Date) => {
    const weekday = date.toLocaleDateString("en-US", { weekday: 'long' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${weekday} • ${day}.${month}`;
  };
  
  const formatDateValue = (date: Date) => {
    return date.toISOString().split('T')[0];
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

      {/* Date & Time Selection */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold mb-6">When should we pick up?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => onUpdate({ pickupDate: formatDateValue(tomorrow) })}
            className={`p-4 border-2 rounded-xl transition-all text-left ${
              data.pickupDate === formatDateValue(tomorrow)
                ? "border-primary bg-primary/10"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            }`}
          >
            <p className="font-semibold">Tomorrow</p>
            <p className="text-sm text-on-surface-variant font-medium">{formatDateLabel(tomorrow)}</p>
          </button>
          
          <button 
            onClick={() => onUpdate({ pickupDate: formatDateValue(dayAfter) })}
            className={`p-4 border-2 rounded-xl transition-all text-left ${
              data.pickupDate === formatDateValue(dayAfter)
                ? "border-primary bg-primary/10"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            }`}
          >
            <p className="font-semibold">Day After Tomorrow</p>
            <p className="text-sm text-on-surface-variant font-medium">{formatDateLabel(dayAfter)}</p>
          </button>

          <div 
            onClick={() => dateInputRef.current?.showPicker()}
            className={`p-4 border-2 rounded-xl transition-all text-left relative overflow-hidden cursor-pointer ${
              data.pickupDate && data.pickupDate !== formatDateValue(tomorrow) && data.pickupDate !== formatDateValue(dayAfter)
                ? "border-primary bg-primary/10"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            }`}>
            <span className="material-symbols-outlined text-3xl mb-1 text-primary relative z-10">calendar_today</span>
            <p className="font-semibold relative z-10">Calendar</p>
            {data.pickupDate && data.pickupDate !== formatDateValue(tomorrow) && data.pickupDate !== formatDateValue(dayAfter) && (
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

        {/* Time Selection */}
        <div className="mb-8">
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">schedule</span>
            Preferred Pickup Window
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((time) => (
              <button
                key={time}
                onClick={() => onUpdate({ pickupTime: time })}
                className={`group relative py-4 px-2 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-1 ${
                  data.pickupTime === time 
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "border-slate-100 dark:border-slate-800 hover:border-primary/30 bg-white dark:bg-slate-900"
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-tighter opacity-60 ${data.pickupTime === time ? 'text-white' : ''}`}>
                  {parseInt(time) < 12 ? 'Morning' : 'Afternoon'}
                </span>
                <span className="text-xl font-black">{time}</span>
                {data.pickupTime === time && (
                  <motion.div 
                    layoutId="time-active"
                    className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900"
                  >
                    <span className="material-symbols-outlined text-[12px] font-black">done</span>
                  </motion.div>
                )}
              </button>
            ))}
            
            {/* Custom Time Input */}
            <div className={`col-span-2 sm:col-span-1 md:col-span-2 relative group rounded-2xl border-2 transition-all duration-300 ${
              data.pickupTime && !["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].includes(data.pickupTime)
                ? "border-primary bg-primary/5 shadow-inner"
                : "border-slate-100 dark:border-slate-800 border-dashed hover:border-primary/50"
            }`}>
              <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                <span className={`material-symbols-outlined transition-colors ${
                  data.pickupTime && !["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].includes(data.pickupTime)
                    ? "text-primary"
                    : "text-slate-400 group-hover:text-primary"
                }`}>more_time</span>
                <span className={`ml-2 text-xs font-bold uppercase tracking-tight transition-colors ${
                  data.pickupTime && !["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].includes(data.pickupTime)
                    ? "text-primary"
                    : "text-slate-400 group-hover:text-primary"
                }`}>Custom Time</span>
              </div>
              <input 
                type="time" 
                value={data.pickupTime || ""} 
                onChange={(e) => onUpdate({ pickupTime: e.target.value })}
                className="w-full h-full bg-transparent p-4 pl-32 font-black text-lg outline-none cursor-pointer appearance-none text-right pr-6"
              />
            </div>
          </div>
        </div>

        {data.distance > 0 && (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
              <div className="flex items-center gap-4">
                 <div className="bg-green-500 text-white p-2 rounded-full flex-shrink-0">
                    <span className="material-symbols-outlined text-sm">check</span>
                 </div>
                 <div>
                    <p className="font-bold text-green-800 dark:text-green-300">Route verified</p>
                    <p className="text-sm text-green-700/80 dark:text-green-400/80">Our drivers are available in this area.</p>
                 </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-700">
                <span className="material-symbols-outlined text-8xl">local_shipping</span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <p className="font-bold">Pickup</p>
                </div>
                <p className="text-lg font-black text-slate-700 dark:text-slate-200">{data.pickupDate || 'Select Date'}</p>
                <p className="text-sm font-bold text-primary mt-1">{data.pickupTime || 'Select Time'}</p>
              </div>

              <div className="flex flex-col items-center gap-2 py-4 md:py-0 border-y md:border-y-0 md:border-x border-slate-200 dark:border-slate-700 px-8">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Duration</span>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary animate-pulse-slow">more_time</span>
                  <span className="text-2xl font-black text-secondary">{data.duration}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Direct Transport</span>
              </div>

              <div className="flex-1 text-center md:text-right">
                <div className="flex items-center gap-2 justify-center md:justify-end mb-1">
                  <p className="font-bold">Delivery</p>
                  <span className="material-symbols-outlined text-secondary">near_me</span>
                </div>
                <p className="text-lg font-black text-slate-700 dark:text-slate-200">{data.pickupDate || 'Select Date'}</p>
                <p className="text-sm font-bold text-secondary mt-1">ca. {data.duration} after pickup</p>
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