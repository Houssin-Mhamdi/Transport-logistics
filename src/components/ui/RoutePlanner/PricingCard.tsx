"use client";

import { formatCurrency, formatDistance } from "@/lib/utils";
import { RoutePlan } from "@/types";


interface PricingCardProps {
  route: RoutePlan;
  onBook?: () => void;
}

export default function PricingCard({ route, onBook }: PricingCardProps) {
  const { pricing } = route;

  return (
    <div className="bg-primary-container p-8 rounded-xl text-on-primary-container shadow-xl relative overflow-hidden">
      {/* Decorative Icon */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-9xl">payments</span>
      </div>

      {/* Header */}
      <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined">analytics</span>
        Pricing Breakdown
      </h2>

      {/* Breakdown */}
      <div className="space-y-4 mb-10">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="text-white/70 font-medium">Total Distance</span>
          <span className="text-xl font-black">{formatDistance(route.totalDistance)}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="text-white/70 font-medium">Rate per km</span>
          <span className="text-xl font-black">{formatCurrency(pricing.ratePerKm, pricing.currency)}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="text-white/70 font-medium">Distance Cost</span>
          <span className="text-xl font-black">{formatCurrency(route.totalDistance * pricing.ratePerKm, pricing.currency)}</span>
        </div>
        
        {/* Additional Fees */}
        <div className="flex justify-between items-center text-sm pb-1 text-white/50">
           <span>Base Fee</span>
           <span>{formatCurrency(pricing.baseFee, pricing.currency)}</span>
        </div>
        <div className="flex justify-between items-center text-sm pb-1 text-white/50">
           <span>Fuel Surcharge</span>
           <span>{formatCurrency(pricing.fuelSurcharge, pricing.currency)}</span>
        </div>
        <div className="flex justify-between items-center text-sm pb-4 border-b border-white/10 text-white/50">
           <span>Toll Fees</span>
           <span>{formatCurrency(pricing.tollFees, pricing.currency)}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-white/70 font-medium">Total Price</span>
          <span className="text-3xl font-black text-secondary-container">
            {formatCurrency(
              (route.totalDistance * pricing.ratePerKm) + pricing.baseFee + pricing.fuelSurcharge + pricing.tollFees, 
              pricing.currency
            )}
          </span>
        </div>
      </div>

      {/* Book Button */}
      <button 
        className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-black py-5 rounded-md text-lg shadow-lg hover:shadow-secondary-container/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        onClick={onBook}
      >
        BOOK THIS ROUTE
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
      
      <p className="text-center mt-4 text-xs text-white/50 font-medium">
        Estimate valid for 24 hours. Includes fuel surcharges and toll fees.
      </p>
    </div>
  );
}