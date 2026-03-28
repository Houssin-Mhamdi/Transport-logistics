"use client";

import { formatCurrency, formatDistance } from "@/lib/utils";
import { RoutePlan } from "@/types";
import { VEHICLES } from "@/lib/constants";

interface PricingCardProps {
  route: RoutePlan;
  onBook?: () => void;
  onVehicleChange?: (vehicleId: 'car' | 'transporter' | 'suitcase' | 'suitcase_lift') => void;
}

export default function PricingCard({ route, onBook, onVehicleChange }: PricingCardProps) {
  const { pricing } = route;
  const currentVehicle = VEHICLES.find(v => v.id === route.vehicleType) || VEHICLES[1];

  return (
    <div className="bg-primary-container p-8 rounded-xl text-on-primary-container shadow-xl relative overflow-hidden h-full flex flex-col">
      {/* Decorative Icon */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-9xl">payments</span>
      </div>

      {/* Header */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">analytics</span>
        Pricing Breakdown
      </h2>

      {/* Circular Vehicle Selector */}
      <div className="flex justify-between gap-2 mb-8 bg-white/5 p-2 rounded-full border border-white/10">
        {VEHICLES.map((v) => (
          <button
            key={v.id}
            onClick={() => onVehicleChange?.(v.id as any)}
            className={`
              relative w-14 h-14 rounded-full transition-all duration-300 group
              ${route.vehicleType === v.id
                ? "ring-4 ring-secondary-container scale-110 z-10"
                : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
              }
            `}
            title={v.name}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white/20">
              <img 
                src={
                  v.id === 'car' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2s6ShBMBJlEA5IjLuJPOF5unVBF1DI05D8A8MQhRd4o131KSCqiJy5KxirevqvTneVi5lKK87jGESp2xoO-WLJhImLDknbXHhH-h0rf0gvdMJdiPTqQV6Urk12m2WZ4jV3Uq7bDFHr-jlkVD0GxCY0KYRpmfOume6jMd1Wpy1SzVzfCnreonnMZn8LVPj4N2sXdD01tG1jdsOLHAdNHRfP0X8Mh1cVnGrD3rRBNbnYvhrSyGj7IoRyPPiCnZpew09XuIlXJj8VSx' :
                  v.id === 'transporter' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9tGK_s7QJ9-y8RoM8lQXediFS9IbJexJaiZvpn-sOxd2FH9ozJCqtmDOorCWYAV9Yyg43rq6OwaQVvRoOsvaixl1vrnxEhCYMP3lbZ9rfG2DGRgYtI2HhNY7UQUYVNc4riF2AxsZH6-8RRpBf_lxjz2VeKO-Hoe3x8D6pVw7P4VJuDZW2sT16DGt1U6pQL_2U-UUyAbWEmxbhFAvMKYYA6ZR5QzGIY3ZfHs7MN7cS5Wj4e8Rp6IKc9UDVzyvYJagbzI9SZ56eCscW' :
                  v.id === 'suitcase' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAC9AB93-yP48F31YNfx6CiGw7kGwDYaABYulpvbiILIqGd22wAOptps_hS0Dps4i9IiOb_LfDgro8_NN8tAbQMAyKmKfQDHM_Ezwf8MNXZDMuqCImeRFvznxEyWsLGr2G_xej3uRhUA6-9a2DrjRzfK7V1EIh16-iB7hlv--S0pE8eE0n5XWNuPSZsLXV_fx4LDvF84WLd1FPSvTgKKRZxJwc1MJgw_4JLObChrEb3mP9W6avGISNSGo_XXg5srkl13iHxphTE-Z8' :
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAP6AKj83kCxgbZ7vXzBuInmPqEN-m0CY-WaEtVk3AcnCFZ9na50B4fjseQUBeEfYhjS3zfRy5nqo8scsnq5VVdANjcok_u_Za0_rHzFqCVI_WmGzebvqTRgmjEinWMyb9JdTj_Vt6y7mn7_LeixX-mpnXWOUrL6yAlg5fWLo7fFbCOl5ymWhsyDqlJc__OQljPbhKVtUES2MfA4XzCUdkmWD4a7Vy4Y04_4AV9U5R6YffbJHMonWw6YjoNi6lx7CZFj_QOlH4vlCSY'
                }
                alt={v.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Minimal label on hover */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-0.5 rounded text-white">
              {v.id === 'car' ? 'Car' : v.id === 'transporter' ? 'Trans' : v.id === 'suitcase' ? 'Truck' : 'Lift'}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Vehicle Info */}
      <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4">
        <div className="bg-secondary-container/20 p-2 rounded-lg">
          <span className="material-symbols-outlined text-secondary-container">
            {currentVehicle.icon}
          </span>
        </div>
        <div>
          <div className="text-xs text-white/50 font-bold uppercase tracking-wider mb-0.5">Selected Asset</div>
          <div className="font-bold text-white tracking-tight">{currentVehicle.name}</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-4 mb-auto">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="text-white/70 font-medium">Total Distance</span>
          <span className="text-xl font-black">{formatDistance(route.totalDistance)}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="text-white/70 font-medium ml-4">Rate per km</span>
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
           <span>Fuel Surcharge (12%)</span>
           <span>{formatCurrency(pricing.fuelSurcharge, pricing.currency)}</span>
        </div>
        <div className="flex justify-between items-center text-sm pb-4 border-b border-white/10 text-white/50">
           <span>Toll Fees (Estim.)</span>
           <span>{formatCurrency(pricing.tollFees, pricing.currency)}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-white/70 font-medium text-lg">Total Price</span>
          <span className="text-3xl font-black text-secondary-container tracking-tighter">
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